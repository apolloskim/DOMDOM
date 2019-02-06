import DOMDOMNodeCollection from './domdom_node_collection';

let documentReady = false;
let cbArray = [];
let results;
let answers = [];
let count = 0;
let answerStatus = new Array(12);
answerStatus.fill(false, 0, 12);

window.$l = arg => {
  if (typeof arg === "string") {
    let nodeListArr = document.querySelectorAll(arg);
    nodeListArr = Object.assign([], nodeListArr);
    return new DOMDOMNodeCollection(nodeListArr);
  } else if (typeof arg === 'object' && arg instanceof HTMLElement) {
      const htmlArr = [arg];
      return new DOMDOMNodeCollection(htmlArr);
  } else if (typeof arg === 'function') {
      if (!documentReady) {
        cbArray.push(arg);
      } else {
        arg();
      }
  }
};

window.$l.extend = (...obj) => {
  return Object.assign({}, ...obj);
};

window.$l.ajax = option => {
  let defaultOption = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };

  let request = new XMLHttpRequest();

  option = $l.extend(defaultOption, option);

  if (option.method === 'GET') {
    let query = "";
    for (const elem in option.data) {
      query += `${elem}=${option.data[elem]}&`;
    }
    if (Object.values(option.data).length !== 0) {
      option.url += `?${query.substring(0, query.length - 1)}`;
    }
  }

  request.open(option.method, option.url, true);
  request.send(JSON.stringify(option.data));

  return new Promise ((resolve, reject) => {
    request.onload = () => {
      if (request.status === 200) {
        resolve(JSON.parse(request.response));
      } else {
        reject(JSON.parse(request.response));
      }
    };
  });
}

const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

const appendQuestions = (rObj, count) => {
  let str = '';
  rObj.forEach(q => {
    let c = -1;
    let sm = q.choices.map(ans => {
      c++;
      return `<li class="lists-${count}-${c} ${typeof answerStatus[count] === 'string' && answerStatus[count] === ans && answerStatus[count] === answers[count] ? 'correct-answer' : (typeof answerStatus[count] === 'string' && answerStatus[count] === ans && answerStatus[count] !== answers[count] ? 'incorrect-answer' : 'default-color')}">${ans}</li>`
    })
    sm = sm.join('');
    str += `<div class="main-container"><li><h3>${count + 1}) ${q.question}</h3><ol class="choices">${sm}</ol></li></div>`;
    count++;
  });
  return [str, count];
};

const separateQuestions = quesArr => {
  let resultsPiece = quesArr.slice(count, count + 4);
  let elemArr = appendQuestions(resultsPiece, count);
  let elemStr = elemArr[0];
  count = elemArr[1];
  $l('ul').html(elemStr);
};

const renderNextPage = (results) => {
  return e => {
    separateQuestions(results);
    $l("li[class^='lists-']").on("click", checkAnswer);
    // console.log(count);
    if (count === 0) {
      $l("#prev-button").attr('style', 'pointer-events: none; opacity: 0;');
    } else {
      // debugger
      $l("#prev-button").attr('style', 'pointer-events: auto');
    }
    if (count === 12) {
      $l("#next-button").html("COMPLETE?");
      $l("#next-button").off("click", renderNextPage(results));
      // $l("#prev-button").off("click", renderPrevPage(results));
      $l("#next-button").on("click", renderResultsPage);
    }
  }
};

const renderResultsPage = e => {
  let numCorrectAns = 0;
  for (let i = 0; i < 12; i++) {
    if (answerStatus[i] === answers[i]) {
      numCorrectAns++;
    }
  }
  $l('#result').removeClass('main-container');
  $l('.main-container').remove();
  $l('#result').addClass('main-container score');
  $l('#result').html(`<span id="first-line">Your Score is: </span><span>${numCorrectAns}/12</span>`);
  $l('.result-container').attr('style', 'display: flex');
  $l('#prev-button').html("GO BACK?");
  $l('#prev-button').on('click', () => {
    count = 0;
    separateQuestions(results);
    $l("#prev-button").attr('style', 'pointer-events: none; opacity: 0;');
    $l('#next-button').html("NEXT");
    $l('#next-button').off("click", rerenderPage);
    $l('#next-button').on('click', renderNextPage(results));
    $l('.result-container').attr('style', 'display: none');
    $l("li[class^='lists-']").on("click", checkAnswer);
  });
  $l("#next-button").html("NEW GAME?");
  $l("#next-button").on("click", rerenderPage);
}

const rerenderPage = e => {
  // location.reload();

  return $l.ajax({
    url: `https://opentdb.com/api.php`,
    data: {"amount": 12, "category": 12, "difficulty": "easy", "type": "multiple"}
  }).then(response => {
    count = 0;
    results = Object.assign([], response.results);

    answers = [];
    let answerStatus = new Array(12);
    answerStatus.fill(false, 0, 12);

    results.forEach(r => {
      answers.push(r.correct_answer);
    });
    results = results.map(r => {
      let arr = r.incorrect_answers.concat(r.correct_answer);
      for (var i = arr.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
      let resultsObj = {'question': r.question, 'choices': arr};
      return resultsObj;
    });

    separateQuestions(results);
    $l("#next-button").html("NEXT");
    $l("#prev-button").html("PREVIOUS");
    $l("#result").html("");
    $l("#result").removeClass("main-container");
    $l("prev-button").attr("style", "pointer-events: none; opacity: 0;");
    $l("#prev-button").off("click", rerenderPage);
    $l("#next-button").off("click", renderResultsPage);
    $l("#next-button").on("click", renderNextPage(results));
    $l("#prev-button").on("click", renderPrevPage(results));
    $l("li[class^='lists-']").on("click", checkAnswer);
    $l("#prev-button").attr('style', 'pointer-events: none; opacity: 0;');
  });
};

const renderPrevPage = (results) => {
  return e => {
    if (count > 0) {
      count -= 8;
      separateQuestions(results);
      $l("li[class^='lists-']").on("click", checkAnswer);
    }
    if (count === 4) {
      // console.log($l("#prev-button"));
      $l("#prev-button").attr('style', 'pointer-events: none; opacity: 0;');
    } else {
      // debugger
      $l("#prev-button").attr('style', 'pointer-events: auto');
    }
    if (count < 12) {
      $l("#next-button").attr('style', 'pointer-events: auto');
      $l("#next-button").html("NEXT");
      $l("#next-button").off("click", renderResultsPage);
      $l("#next-button").on("click", renderNextPage(results));
    }
  }
};

const checkAnswer = e => {
    if (answers.includes(e.target.innerHTML)) {
    let idx = answers.indexOf(e.target.innerHTML);
    answerStatus[idx] = e.target.innerHTML;
    let classId = e.target.className.split(" ")[0];
    checkIfCorrect(idx, classId);
  } else {
    let reg = /[0-9]+/;
    let classId = e.target.className.split(" ")[0];
    let idx = classId.match(reg)[0];
    answerStatus[idx] = e.target.innerHTML;
    // console.log(classId, idx);
    checkIfCorrect(idx, classId);
  }
}

const checkIfCorrect = (index, listClass) => {
  if (answerStatus[index] === answers[index]) {
    $l(`li[class^='lists-${index}']`).removeClass('incorrect-answer');
    $l(`li[class^='lists-${index}']`).removeClass('correct-answer');
    $l(`li[class^='lists-${index}']`).addClass('default-color');
    $l(`.${listClass}`).addClass('correct-answer');
  } else {
    $l(`li[class^='lists-${index}']`).removeClass('incorrect-answer');
    $l(`li[class^='lists-${index}']`).removeClass('correct-answer');
    $l(`li[class^='lists-${index}']`).addClass('default-color');
    $l(`.${listClass}`).addClass('incorrect-answer');
  }
}

$l($l.ajax({
  url: `https://opentdb.com/api.php`,
  data: {"amount": 12, "category": 12, "difficulty": "easy", "type": "multiple"}
}).then (response => {
  results = Object.assign([], response.results);
  results.forEach(r => {
    answers.push(r.correct_answer);
  });
  results = results.map(r => {
    let arr = r.incorrect_answers.concat(r.correct_answer);
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    let resultsObj = {'question': r.question, 'choices': arr};
    return resultsObj;
  });
  separateQuestions(results);
  $l("#next-button").on("click", renderNextPage(results));
  $l("#prev-button").on("click", renderPrevPage(results));
  $l("li[class^='lists-']").on("click", checkAnswer);
}));

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  cbArray.forEach(cb => cb());
  $l("#prev-button").attr('style', 'pointer-events: none; opacity: 0;');
});
