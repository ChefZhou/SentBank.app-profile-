'use strict';

// 用戶資訊
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  totalLoans: 0,
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  totalLoans: 0,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  totalLoans: 0,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  totalLoans: 0,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// 元素
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelSumLoan = document.querySelector('.summary__value--loan');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 使用者名稱

accounts.forEach(acc => {
  acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
});

// 更新介面的函數
const updateUI = function (account) {
  // 交易明細
  displayMovements(account.movements);
  // 餘額顯示
  calcDisplayBalance(account);
  // 匯入顯示
  calcDisplaySummary(account);
  // 提款顯示
  calcDisplayOutPut(account);
  // 貸款顯示
  calcDisplayLoan(account);
  // 利息顯示
  interest(account);
  // 登出倒數
  startLogOutTimer(account);
};

// 登入系統&介面
let currentAccounts;
// 時間功能
const now = new Date();
const year = now.getFullYear();
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const day = `${now.getDate()}`.padStart(2, 0);
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${year}年/${month}月/${day}日  ${hour}點:${min}分`;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('LOGIN');

  currentAccounts = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccounts);

  if (currentAccounts?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');

    // 歡迎文字
    labelWelcome.textContent = `歡迎使用,${
      currentAccounts.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // 介面更新
    updateUI(currentAccounts);
    // 使用者名稱消除
  } else {
    console.log('Login failed');
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
});

// 帳戶刪除
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('DELETE');
  //
  const confirmDelete = confirm('確認刪除帳戶?');
  if (confirmDelete) {
    if (
      inputCloseUsername?.value === currentAccounts.username &&
      Number(inputClosePin.value) === currentAccounts.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccounts.username
      );
      console.log(index);
      // 帳戶刪除
      accounts.splice(index, 1);
      console.log('Account deleted');
      alert('帳戶已刪除');
      // 清除介面資料&顯現登入畫面
      containerApp.style.opacity = 0;
      labelWelcome.textContent = '請登入帳戶';
      inputLoginUsername.value = inputLoginPin.value = '';

      currentAccounts = undefined;
    }
  } else {
    console.log('Incorrect credentials');
  }
  // 輸入消除
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();
});

// 轉帳
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  console.log('Transfer');

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  // 自己餘額
  const currentBalance = currentAccounts.movements
    .map(mov => (mov.amount !== undefined ? mov.amount : mov))
    .reduce((acc, mov) => acc + mov, 0);

  if (
    amount > 0 &&
    currentBalance >= amount &&
    receiverAcc?.username !== currentAccounts.username
  ) {
    setTimeout(function () {
      console.log('Transfer valid');
      // 對方加錢
      currentAccounts.movements.push({
        amount: -amount,
        type: 'transfer',
        from: currentAccounts.username,
        to: receiverAcc.username,
      });
      // 自己扣錢
      receiverAcc.movements.push({
        amount: amount,
        type: 'transfer',
        from: currentAccounts.username,
        to: receiverAcc.username,
      });
      // 增加日期
      const now = new Date();
      currentAccounts.movementsDates.push(now.toISOString());
      receiverAcc.movementsDates.push(now.toISOString());
      // 介面更新
      updateUI(currentAccounts);
      // 成功或失敗
      alert('轉帳成功');
      console.log('Transfer completed');
      startLogOutTimer();
      inputTransferAmount.value = inputTransferTo.value = '';
    }, 1000);
  } else {
    setTimeout(function () {
      console.log('Transfer failed');
      alert('轉帳失敗');
    }, 1000);
  }
  // 輸入消失
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

// 貸款(最大貸款金額只能匯入之10倍,例如100最大只能貸到1000)

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //條件設定 (找出帳戶中的最大款項，排除貸款金額)
  const amount = Number(inputLoanAmount.value);

  const maxMovement = Math.max(
    ...currentAccounts.movements.filter(mov => mov > 0 && !mov.isLoan)
  );

  // 檢查貸款金額是否超過最大款項的 10 倍
  if (
    amount > 0 &&
    currentAccounts.movements.some(mov => mov >= amount * 0.1 && !mov.isLoan) &&
    amount <= maxMovement * 10 &&
    currentAccounts.totalLoans + amount <= maxMovement * 10
  ) {
    setTimeout(function () {
      // 標記借貸金額成功與否
      currentAccounts.movements.push({ amount: amount, isLoan: true });

      // 增加日期
      const now = new Date();
      currentAccounts.movementsDates.push(now.toISOString());
      // 更新總額
      currentAccounts.totalLoans += amount;
      // 更新介面&計時器
      updateUI(currentAccounts);
      console.log('Loan success');
      alert('貸款成功');
      startLogOutTimer();
    }, 1000);
  } else {
    setTimeout(function () {
      startLogOutTimer();
      console.log('Loan failed');
      alert('超過貸款上限!');
    }, 1000);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// 排序按鈕
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  console.log('Sort button clicked');
  displayMovements(currentAccounts.movements, !sorted);
  sorted = !sorted;
});

// 內容介面顯示
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // (測試為什麼無法更新排序) console.log('Sort parameter:', sort);
  const movs = sort
    ? movements
        .slice()
        .sort(
          (a, b) =>
            (a.amount !== undefined ? a.amount : a) -
            (b.amount !== undefined ? b.amount : b)
        )
    : movements;

  movs.forEach(function (mov, i) {
    const type = mov.isLoan
      ? '貸款'
      : mov.type === 'transfer'
      ? mov.from === currentAccounts.username
        ? '匯出'
        : '匯入'
      : mov > 0
      ? '匯入'
      : '匯出';
    const value = mov.amount !== undefined ? mov.amount : mov;
    const date = new Date(currentAccounts.movementsDates[i]);
    const formattedDate = `${date.getFullYear()}年/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}月/
      ${date.getDate().toString().padStart(2, '0')}日`;
    const html = `<div class="movements__row">
      <div class="movements__type 
      movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${formattedDate}</div>
      <div class="movements__value">${value}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 餘額顯示
const calcDisplayBalance = account => {
  const balance = account.movements
    .map(mov => (mov.amount !== undefined ? mov.amount : mov))
    .reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

// 入賬總額
const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(
      mov =>
        mov >= 0 || (mov.type === 'transfer' && mov.to === account.username)
    )
    .reduce(
      (acc, mov) => acc + (mov.amount !== undefined ? mov.amount : mov),
      0
    );
  labelSumIn.textContent = `${incomes}€`;
};

// 出帳總額
const calcDisplayOutPut = account => {
  const outgoings = account.movements
    .filter(
      mov =>
        mov <= 0 || (mov.type === 'transfer' && mov.from === account.username)
    )
    .reduce(
      (acc, mov) => acc + (mov.amount !== undefined ? mov.amount : mov),
      0
    );
  labelSumOut.textContent = `${Math.abs(outgoings)}€`;
};

// 貸款顯示
const calcDisplayLoan = account => {
  const loans = account.movements
    .filter(mov => mov.isLoan)
    .reduce((acc, mov) => acc + mov.amount, 0);
  labelSumLoan.textContent = `${loans}€`;
};

// 利息
const interest = account => {
  const incomes = account.movements
    .filter(mov => mov >= 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${incomes.toFixed(2)}€`;
};

//計時器
let timer;
let isTimerRunning = false;

const startLogOutTimer = function () {
  if (isTimerRunning) clearInterval(timer);
  isTimerRunning = true;

  let time = 150;
  timer = setInterval(function () {
    const min = Math.trunc(time / 60);
    const sec = time % 60;
    labelTimer.textContent = `${String(min).padStart(2, '0')}:${String(
      sec
    ).padStart(2, '0')}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      labelTimer.textContent = '00:00';
      alert('請重新登入');
      // 執行登出
      containerApp.style.opacity = 0;
      labelWelcome.textContent = '請登入帳戶';
      currentAccounts = undefined;
      isTimerRunning = false;
    }
  }, 1000);
};
