import React from "react";
import AnswerModal from "./AnswerModal";
import { MathHelper } from "../utils";
import './Quiz.css'
import "animate.css"
import bar from "../assets/bar.png"
import circle from "../assets/circle.jpg"
import Options from "./Options";
import sessionData from "../utils/sessionData";


const queryParams = new URLSearchParams(window.location.search);
const limit = queryParams.get('limit') ? queryParams.get('limit') : 18;
const unit = queryParams.get('unit') ? queryParams.get('unit') : 4;
const symb = queryParams.get('sym') ? queryParams.get('sym') : "+";
const dif = queryParams.get('dif') ? queryParams.get('dif') : 'b';
const order = queryParams.get('order') ? queryParams.get('order') : "asc";
const streakLimit = parseInt(limit / 3)
class Quiz extends React.Component {
  _isMounted = false;
  _secondsIntervalRef;
  state = {
    problem: "",
    symbol: symb,
    question:[],
    answer: [],
    modal: "",
    modalShowing: false,
      streaks: 0,
      currentDifficulty: dif,
      orders:order,
    units:unit,
    totalProblems: 1,
  };

  earnLife = () => {
    this.props.onEarnLife();
    this.showModal("success", "STREAK!! You won a life ♥");
    if (this.state.currentDifficulty == 'b') {
      this.setState({
        streaks: 0,
        currentDifficulty: 'i'
      });
    }
    else if (this.state.currentDifficulty == 'i') {//hard,med chck
      this.setState({
        streaks: 0,
        currentDifficulty: 'h'
      });
    }
  };

  correctAnswer = () => {
    console.log(this.state.streaks)
    if (this.state.streaks > streakLimit - 1) {
      this.earnLife();
    } else {
      this.showModal("success");
    }

    this._isMounted && this.props.onCorretAnswer();
    this.setState(state => {
      return {
        streaks: state.streaks + 1
      };
    });

    this.nextProblem();
  };

  componentDidMount() {
      this._isMounted = true;
      this.getProblem(this.state.orders);

    // this.answerInput.focus();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.lifes < 1) {
      this.props.onEndGame(this.state.points);
      return false;
    }
    return nextProps.lifes > -1;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate() {
    if (this.state.totalProblems > limit) {
      this.props.onEndGame(this.state.points)
    }
  }

  wrongAnswer = () => {
    this._isMounted && this.props.onWrongAnswer();
    
    this.setState({
      streaks: 0
    });
    this.showModal("error");
    this.nextProblem();
  };

  nextProblem = () => {
      setTimeout(() => {
          this.getProblem(this.state.orders);
      this._isMounted &&
        this.setState({
          modalShowing: false,
          totalProblems: this.state.totalProblems + 1
        });
      if (this.props.lifes > 0) (this.answerInput && this.answerInput.focus());
      // if(this.state.totalProblems > streakLimit)
      // {
      //   if(this.state.currentDifficulty == 'b')
      //   {
      //     this.setState({
      //       streaks : 0,
      //       totalProblems :0,
      //       currentDifficulty : 'i',
            
      //     });
      //   }
        
      //   else if(this.state.currentDifficulty == 'i')
      //   {
      //     this.setState({
      //       streaks : 0,
      //       totalProblems :0,
      //       currentDifficulty : 'h',
            
      //     });
      //   }
      //   // else if(this.state.currentDifficulty == 'h')
      //   // {

      //   //   this.setState({
      //   //     streaks : 0,
      //   //     totalProblems :0,
      //   //     currentDifficulty : 'b',
      //   //     // units: this.state.units +1 <= 3 ? this.state.units +1 :1
      //   //   });
      //   // }
      //}
      }
    , 2500);
  };

    evaluateProblem = (attemptedAnswer) => {
        for (var i = 0; i < attemptedAnswer.length; i++)
        {
            if (attemptedAnswer[i] != this.state.answer[i]) {
                return this.wrongAnswer();
            }
            
            
        }
         return this.correctAnswer();
    //if (attemptedAnswer == this.state.answer) {
     // sessionData.hitApi(this.state.problem,attemptedAnswer,this.state.answer,this.state.currentDifficulty,this.state.units, 1)
      //return this.correctAnswer();
    //}
  //  else{
  //    sessionData.hitApi(this.state.problem,attemptedAnswer,this.state.answer,this.state.currentDifficulty,this.state.units,0)
   // }
   // return this.wrongAnswer();
  };

  // keyingUp = ev => {
  //   if (ev.key === "Enter") {
  //     this.evaluateProblem();
  //   }
  //   const val = ev.target.value;
  //   this.setState({
  //     answer: Number(val.match(/((-?)\d+)/g)) // accept just numbers and the minus symbol
  //   });
  // };

  showModal = (type, text) => {
    this.setState({
      modal: <AnswerModal type={type} text={text} />,
      modalShowing: true
    });
  };

  getProblem = (orders) => {
      const newProblemSet = MathHelper.generateAdditionProblem(this.state.units, this.state.currentDifficulty);
      let questions = newProblemSet.question;
      //this.state.question = newProblemSet.question;
      if (orders == "asc") {
          this._isMounted &&

              this.setState({

                  symbol: ",",
                  question: newProblemSet.question,
                  answer: [...questions].sort((a,b)=>a-b)
              });
      }
      else {
          this._isMounted &&

              this.setState({

                  symbol: ",",
                  question: newProblemSet.question,
                  answer: [...questions].sort((a, b) => b - a)
              });
      }
  };



  render() {

  return (
    <section className="show-up" style={{ width: "100%", height: "100vh" }}>
      <div >
        {this.state.modalShowing ? (
          this.state.modal
        ) : (
          <div>
            <div>
              <div style={{ borderBottom: "1px solid #aaa", fontSize: "1.5em", marginTop: "30vh", marginLeft: "15%", width: "100%" }}>
                  {/* <div>{this.state.units}</div> */}
                  {/* <div>{this.state.currentDifficulty}</div> */}
                  
                <div style={{ display: "flex", marginLeft: "3vw" }}>
                                      <div style={{ display: "flex" }}>

                                          {this.state.question.map(opt => {
                                              return (
                                                  <div>{opt},</div>
                                                      
                                                                                                )
                                          })}

                                      </div>
                  
                
                                  </div>

                                  {this._isMounted && <Options handleClick={(ans) => this.evaluateProblem(ans)} correctAnswer={this.state.answer} prob={this.state.question}  />}



                              </div>
          </div>
      </div>
        )}
    </div>
    </section >

  );


  }
}

export default Quiz;
