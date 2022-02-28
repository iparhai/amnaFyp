import React, { useEffect } from 'react'

let options = []
export default function Options(props) {
    const [choices, setChoices] = React.useState([])
    const answer = props.correctAnswer
   const problem = props.prob
    useEffect(() => {
        var tempArr = [...Array(parseInt(3))].map((value, index) => {
            
            return getRandomOption(answer, problem)
        })

        const randomIndex = parseInt(Math.random() * tempArr.length);
        tempArr[randomIndex] = answer
        setChoices(tempArr)
        
    },[])

    


    
    

    var getRandomOption = (answer, problem) => {
        var newOption = [...problem].sort(() => Math.random() - 0.5)
        options.push(newOption)
        if (compare(newOption)) {
            getRandomOption(answer, problem)
        }
        return newOption
    }
    const compare = (newOption) => {
        for (var i = 0; i < options.length; i++) {
            for (var j = 0; j < options[i].length; j++) {
                if (newOption[j] != options[i][j]) {
                    return false
                }

            }
            
            for (var k = 0; k < options[i].length; k++) {
                if (newOption[k] != answer[k]) {
                    return false
                }
            }

            return true
        }
    }
   
    return (
        <div>
            {choices.map(opt => {
                return (
                    
                    <ul style={{ display: "flex" }}>
                        <button className="btn fourth answerButton" onClick={() => props.handleClick(opt)}>
                            <div style={{ textAlign: "left", display:"flex" }}>
                        {opt.map(num => {
                            return (
                                
                                <div>{num} ,</div>
                                
                            )
                        })}
                        </div>
                        </button>
</ul>
                        )
            })}

        </div>
    )
}
