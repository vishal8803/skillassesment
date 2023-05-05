import React, { useState } from "react";
import "../Components/css/quiz.css";

function Quiz() {
  const [chooseLevel, setChooseLevel] = useState("");
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [hint1, showHint1] = useState(false);
  const [hint2, showHint2] = useState(false);
  const [hintText, setHintText] = useState("");
  const [finished, setFinished] = useState("");
  const [total, setTotal] = useState("");
  const [hint, setHint] = useState(0);

  const handleStart = async () => {
    setStarted(true);
    var children = document.querySelectorAll(".box");
    var len;
    let score = 0;

    if (chooseLevel == "Easy") {
      len = 5;
      score = 50;
    } else if (chooseLevel == "Medium") {
      len = 8;
      score = 80;
    } else if (chooseLevel == "Hard") {
      len = 10;
      score = 100;
    }
    var array = [];

    for (let i = 1; i <= len; i++) {
      let rand = Math.random() * 64;

      rand = Math.floor(rand);
      array.push(rand);
    }
    setAnswer(array);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    for (let i = 0; i < array.length; i++) {
      light(array[i]);
      await delay(1000);
    }

    function light(num) {
      children[num - 1].classList.add("active");
      setTimeout(function () {
        children[num - 1].classList.remove("active");
      }, 500);
    }

    setAnswer(array);
    await delay(500);
    alert("Now answer by cliking on the box as appeared previously....");
    handleAnswer(array, score);
  };

  const handleAnswer = (array, score) => {
    console.log(array);
    let i = 0;

    var elements = document.getElementsByClassName("wrapper");

    for (var j = 0; j < elements.length; j++) {
      elements[i].addEventListener("click", temp);
    }
    var children = document.querySelectorAll(".box");
    function temp(e) {
      e = e || window.event;
      var target = e.target,
        text = target.textContent || target.innerText;

      if (text == array[i]) {
        children[array[i] - 1].classList.add("correct");
        i++;
        
        if (i == array.length) {
          alert("Guess Sucessful...");
          setTotal(score);
          setFinished(true);
          showHint1(true);
          showHint2(true);
          for (var j = 0; j < elements.length; j++) {
            elements[j].removeEventListener("click", temp);
          }
        }
      } else {
        if (score - 10 < 0) {
          alert("Game Over...");
          setTotal(score);
          setFinished(true);
          showHint1(true);
          showHint2(true);
          for (var j = 0; j < elements.length; j++) {
            elements[j].removeEventListener("click", temp);
          }
          return;
        }

        if (children[text - 1] != undefined) {
          score = score - 10;
          children[text - 1].classList.add("wrong");
          setTimeout(function () {
            children[text - 1].classList.remove("wrong");
          }, 2000);
        } else alert("Please choose inside box");
      }
    }
  };

  const handleClick = (e) => {
    setChooseLevel(e);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const handleHint = (e) => {
    if (answer == undefined || answer == []) {
      alert("Start the game first...");
      return;
    }

    if (e == 1) {
      if (hint1 == false) setHint(hint + 10);
      showHint1(true);
      let text = "The first two numbers are " + answer[0] + ", " + answer[1];
      setHintText(text);
    } else if (e == 2) {
      if (hint2 == false) setHint(hint + 20);
      showHint2(true);
      var temp = [...answer];
      shuffle(temp);
      let text = "The numbers are but not in actual order: ";
      for (let i = 0; i < temp.length; i++) {
        if (i == 0) text = text + temp[i] + ", ";
        else if (i == temp.length - 1) {
          text = text + temp[i];
        } else {
          text = text + temp[i] + ", ";
        }
      }
      setHintText(text);
    }
  };

  return (
    <div>
      {finished && <h2> Your score:- {total - hint} </h2>}
      {chooseLevel == "" ? (
        <div style={{textAlign:'center'}}>
          <h2>Choose Difficulty Level...</h2>
          <button onClick={() => handleClick("Easy")}>Easy</button>&nbsp;
          <button onClick={() => handleClick("Medium")}>Medium</button>&nbsp;
          <button onClick={() => handleClick("Hard")}>Hard</button>&nbsp;
        </div>
      ) : (
        <div>
          <div class="wrapper">
            <div class="top"></div>
            <div class="box">1</div>
            <div class="box">2</div>
            <div class="box">3</div>
            <div class="box">4</div>
            <div class="box">5</div>
            <div class="box">6</div>
            <div class="box">7</div>
            <div class="box">8</div>

            <div class="box ">9</div>
            <div class="box">10</div>
            <div class="box ">11</div>
            <div class="box">12</div>
            <div class="box ">13</div>
            <div class="box">14</div>
            <div class="box ">15</div>
            <div class="box">16</div>

            <div class="box">17</div>
            <div class="box ">18</div>
            <div class="box">19</div>
            <div class="box ">20</div>
            <div class="box">21</div>
            <div class="box ">22</div>
            <div class="box">23</div>
            <div class="box ">24</div>

            <div class="box ">25</div>
            <div class="box">26</div>
            <div class="box ">27</div>
            <div class="box">28</div>
            <div class="box ">29</div>
            <div class="box">30</div>
            <div class="box ">31</div>
            <div class="box">32</div>

            <div class="box">33</div>
            <div class="box ">34</div>
            <div class="box">35</div>
            <div class="box ">36</div>
            <div class="box">37</div>
            <div class="box ">38</div>
            <div class="box">39</div>
            <div class="box ">40</div>

            <div class="box ">41</div>
            <div class="box">42</div>
            <div class="box ">43</div>
            <div class="box">44</div>
            <div class="box ">45</div>
            <div class="box">46</div>
            <div class="box ">47</div>
            <div class="box">48</div>

            <div class="box">49</div>
            <div class="box ">50</div>
            <div class="box">51</div>
            <div class="box ">52</div>
            <div class="box">53</div>
            <div class="box ">54</div>
            <div class="box">55</div>
            <div class="box ">56</div>

            <div class="box ">57</div>
            <div class="box">58</div>
            <div class="box ">59</div>
            <div class="box">60</div>
            <div class="box ">61</div>
            <div class="box">62</div>
            <div class="box">63</div>
            <div class="box">64</div>
          </div>{" "}
          <div style={{textAlign:'center'}}>
          {!started && <button onClick={() => handleStart()}>Start</button>}
          {started && (
            <div>
              <button onClick={() => handleHint(1)}>Hint1</button>&nbsp; &nbsp;
              <button onClick={() => handleHint(2)}>Hint2</button>{" "}
            </div>
          )}
          <br></br>
          {hint1 || hint2 ? hintText : ""}
        </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
