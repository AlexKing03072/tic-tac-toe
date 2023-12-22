
const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.querySelector('.restart-btn');
const startButton1v1 = document.querySelector('.start-btn-1v1');
const startButtonVsComputer = document.querySelector('.start-btn-vs-computer');
const mainMenuButton = document.querySelector('.main-menu-btn');




// 获取按钮元素
const startButton1v1Effect = document.getElementById('startBtn1v1'); // 替换为你的按钮的实际 ID
// 获取按钮元素
const startButtonVsComputerEffect = document.getElementById('startBtnVsComputer'); // 替换为你的按钮的实际 ID



let currentPlayer = 'X';
let gameActive = false; // 初始設定遊戲未啟動
let vsComputerMode;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.style.backgroundImage = `url('${currentPlayer === 'X' ? 'imageX.jpg' : 'imageO.jpg'}')`;
  checkResult();
  togglePlayer();
  
  if (vsComputerMode && gameActive && currentPlayer === 'O') {
    handleComputerMove();
  }
}


function handleComputerMove() {
  if (!gameActive || currentPlayer !== 'O') return;

  let emptyCells = gameState.reduce((acc, currentValue, index) => {
    if (currentValue === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    
    gameState[computerMove] = currentPlayer;
    cells[computerMove].style.backgroundImage = `url('${currentPlayer === 'X' ? 'imageX.jpg' : 'imageO.jpg'}')`;
    checkResult();
    togglePlayer();
  }
}



function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      togglePlayer();//多執行一次toggle,造成顯示不符合
      break;
    }
  }

  // if (roundWon) {
  //   gameActive = false;
  //   setTimeout(() => {
  //     window.alert(`${currentPlayer} 獲勝了！`);
  //     restartButton.style.display = 'block'; // 顯示Restart按鈕
  //     // mainMenuButton.style.display ='block';
  //   }, 500); // 延遲500毫秒显示消息框
  //   return;
  // }

  // if (!gameState.includes('')) {
  //   gameActive = false;
  //   setTimeout(() => {
  //     window.alert('這是平局！');
  //     restartButton.style.display = 'block'; // 顯示Restart按鈕
  //   }, 500); // 延遲500毫秒显示消息框
  //   return;
  // }

  if (roundWon) {
    gameActive = false;
    setTimeout(() => {
      showModal(`${currentPlayer} 獲勝了！`);
      restartButton.style.display = 'block'; // 显示Restart按钮
      // mainMenuButton.style.display ='block';
    }, 500); // 延迟500毫秒显示消息框
    return;
  }
  
  if (!gameState.includes('')) {
    gameActive = false;
    setTimeout(() => {
      showModal('這是平局！');
      restartButton.style.display = 'block'; // 显示Restart按钮
    }, 500); // 延迟500毫秒显示消息框
    return;
  }
  


}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameStatus.textContent = '';
  restartButton.style.display = 'none'; // 隱藏Restart按鈕
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundImage = 'none'; // 清除背景圖片
    // cell.classList.add('no-hover'); // 添加no-hover类来移除hover效果
  });
}

function startGame1v1() {
  startButton1v1.style.display = 'none'; // 隱藏Start按鈕
  startButtonVsComputer.style.display = 'none'; // 隐藏“与电脑对战”的按钮
  gameActive = true;
  cells.forEach(cell => {
    cell.style.backgroundImage = 'none'; // 或者使用其他方式隱藏原先的背景
    // cell.classList.add('no-hover'); // 添加no-hover类来移除hover效果
  });
}
function startVsComputerGame() {
  // 一些初始化逻辑
  startButtonVsComputer.style.display = 'none'; // 隐藏“与电脑对战”的按钮
  startButton1v1.style.display = 'none'; // 隐藏“1v1游戏”的按钮
  gameActive = true; // 启动游戏
  vsComputerMode = true;
  currentPlayer = 'X'; // 设置当前玩家为X
  
  // 在这里可以添加其他需要的逻辑
  
  // 触发第一步玩家的点击事件，如果玩家是 X 的话
  // if (currentPlayer === 'X') {
  //   handleComputerMove(); // Call handleComputerMove() only in vsComputer mode
  // }

  cells.forEach(cell => {
    cell.style.backgroundImage = 'none'; // 或者使用其他方式隱藏原先的背景
    // cell.classList.add('no-hover'); // 添加no-hover类来移除hover效果
  });
  // if (currentPlayer === 'X') {
  //   handleCellClick();
  // }
}

// function returnToMainMenu() {
//   // 隐藏游戏相关按钮，显示主菜单按钮
//   startButton1v1.style.display = 'block';
//   startButtonVsComputer.style.display = 'block';
//   mainMenuButton.style.display = 'none';
//   restartButton.style.display = 'none';
//   // gameStatus.textContent = '';
//   // 其他重置游戏状态的操作
// }



cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});




// // 添加点击事件监听器
// startButton1v1Effect.addEventListener('click', function() {
//   // 在这里添加按钮点击后的特效或动画
//   // 例如改变颜色、大小、旋转等
//   button.style.backgroundColor = '#ff6347'; // 改变背景颜色为红色
//   button.style.transform = 'rotate(45deg)'; // 旋转按钮
// });


// // 添加点击事件监听器
// startButtonVsComputerEffect.addEventListener('click', function() {
//   // 在这里添加按钮点击后的特效或动画
//   // 例如改变颜色、大小、旋转等
//   button.style.backgroundColor = '#ff6347'; // 改变背景颜色为红色
//   button.style.transform = 'rotate(45deg)'; // 旋转按钮
// });


restartButton.addEventListener('click', restartGame);
startButton1v1.addEventListener('click', startGame1v1);
startButtonVsComputer.addEventListener('click', startVsComputerGame);
// mainMenuButton.addEventListener('click', returnToMainMenu);



// 显示模态框
function showModal(message) {
  const modal = document.getElementById('customModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

// 关闭模态框
function closeModal() {
  const modal = document.getElementById('customModal');
  modal.style.display = 'none';
}
