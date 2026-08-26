export default  function MultiSelect({ options=[], title, selected = [], onChange}) {

    /* Don't understand this */
    
    const toggleOption = (option) => {
        /* Find if clicked label is already in selected, it will return true or false */
        const isSelected = selected.some(o => o.label === option.label)

        /* If it's already selected, then remove it from selected array since it's toggling */
        if (isSelected) {
            onChange(selected.filter(o => o.label !== option.label))
        }
        else
        {
            /* If it's not already there, add it to selected*/
            onChange([...selected, option])
        }
        
    }

    

    return (
        <div className="multiselect-container">
            <h2 className="multiselect-title">{title}</h2>
            <p className="multiselect-subtitle">Choose all that apply.</p>
            <div className="multiselect-grid">
                {options.map((option) => {
                    return (
                        <button
                            key={option.label}
                            onClick={() => toggleOption(option)}
                            className={`multiselect-option-button ${selected.some(o => o.label === option.label) ? "selected" : ""} `}
                        >
                            {option.icon}
                            {option.label}
                        </button>
                    )
                })}
            </div>
            
        </div>
    )
}