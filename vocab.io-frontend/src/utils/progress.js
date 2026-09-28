import { supabase } from "../lib/supabase-client.js" // import the Supabase client

export const recordFeedback = async (keywordId, wasCorrect) => {
  const { data: { user } } = await supabase.auth.getUser() // get the logged-in user

  const { data: existing } = await supabase
    .from("word_progress")        
    .select("*")                  // get all columns
    .eq("user_id", user.id)      
    .eq("keyword_id", keywordId)  
    .maybeSingle()                // return one row or null (no error if none)

  if (existing) {
    // row already exists → update it
    await supabase
      .from("word_progress")
      .update({
        correct_count: existing.correct_count + (wasCorrect ? 1 : 0),     // add 1 if correct
        incorrect_count: existing.incorrect_count + (wasCorrect ? 0 : 1), // add 1 if wrong
        last_reviewed_at: new Date().toISOString()                       // update timestamp
      })
      .eq("id", existing.id) // target that specific row
  } else {
    // no row yet → create one
    await supabase.from("word_progress").insert({
      user_id: user.id,
      keyword_id: keywordId,
      correct_count: wasCorrect ? 1 : 0,     // start at 1 or 0
      incorrect_count: wasCorrect ? 0 : 1,   // start at 1 or 0
      last_reviewed_at: new Date().toISOString()
    })
  }
}