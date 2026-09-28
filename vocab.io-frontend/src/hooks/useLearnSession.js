import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase-client.js"

// A CUSTOM HOOK — a reusable function that bundles up state + fetching
// logic, so multiple game components (Test, MCQs, Match, etc.) can all
// share this exact same "get me this user's session + questions" logic
// instead of each copy-pasting their own version.
//
// filterType is optional — pass 'mcq', 'translation', or 'pronunciation'
// to get only that slice of questions; pass nothing to get everything.
// Example: useLearnSession('mcq') → only the questions Flask happened
// to generate as type 'mcq' this round.
export function useLearnSession(filterType = null) {

    // The final list of questions this component will render
    const [questions, setQuestions] = useState([])

    // Tracks whether the fetch is still in progress, so the calling
    // component can show a "Loading..." message while waiting
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // useEffect itself can't be async, so we define an async
        // function inside it and call it right after
        const load = async () => {

            // Get the currently logged-in user
            const { data: { user } } = await supabase.auth.getUser()

            // Safety check — if somehow no one is logged in, stop here
            // instead of crashing later when we try user.id
            if (!user) { setLoading(false); return }

            // Fetch this user's most recently created session (the
            // paragraph + language it was generated from)
            const { data: session, error: sessionError } = await supabase
                .from("sessions").select("*").eq("user_id", user.id)
                .order("created_at", { ascending: false })   // newest first
                .limit(1)                                     // only want one row
                .single()                                     // return it as one object, not an array

            // If no session exists yet (e.g. brand new user, never
            // extracted keywords), stop here — nothing to build a lesson from
            if (sessionError) { console.error(sessionError.message); setLoading(false); return }

            // Fetch just this session's keywords — the 10-15 words tied
            // to that specific paragraph via session_id
            const { data: keywords, error: keywordsError } = await supabase
                .from("keywords").select("id, word, translation").eq("session_id", session.id)

            if (keywordsError) { console.error(keywordsError.message); setLoading(false); return }

            try {
                // Send the keywords + original paragraph + language to
                // Flask, which builds a mixed set of mcq/translation/
                // pronunciation questions and sends them back
                const response = await fetch('http://127.0.0.1:5000/api/learn-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keywords, original_text: session.source_text, language: session.language })
                })

                // Parse the JSON response body into a real JS object
                const data = await response.json()

                // data.questions might be missing if something went wrong
                // server-side — fall back to an empty array instead of
                // crashing on .filter() below
                const all = data.questions || []

                // If a filterType was requested (e.g. 'mcq'), only keep
                // questions matching that type. Otherwise, keep everything.
                // Example: all = [{type:'mcq',...}, {type:'translation',...}]
                //          filterType = 'mcq'
                //          → questions = [{type:'mcq',...}]  (just the one)
                setQuestions(filterType ? all.filter(q => q.type === filterType) : all)

            } catch (err) {
                // Catches network-level failures (server down, no internet)
                // — NOT bad JSON responses, just total connection failures
                console.error("Failed to load session:", err)

            } finally {
                // Runs whether the fetch succeeded or failed — guarantees
                // the loading spinner always turns off eventually
                setLoading(false)
            }
        }

        load()   // actually run the function we just defined

    }, [filterType])
    // Dependency array contains filterType — meaning this whole effect
    // re-runs if filterType ever changes (e.g. a component switches from
    // asking for 'mcq' to asking for 'translation' after first render).
    // With no filterType passed, this is effectively still "run once,"
    // since null never changes between renders.

    // Return both pieces of data so the calling component can use them,
    // e.g.: const { questions, loading } = useLearnSession('mcq')
    return { questions, loading }
}