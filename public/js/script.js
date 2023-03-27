/* reg variables */
const regForm = document.querySelector('.register-form');
const regError = document.querySelector('#reg-error');
const passWord = document.querySelector('#password');
const confpassWord = document.querySelector('#pword2');
const registerBtn = document.querySelector('.register-btn');
/* end reg variables */

/* Register Form */
/* regForm.addEventListener('submit', (e) => {
  let errMessage = []

  if (passWord.value.length <= 6) {
    errMessage.push('*Password must be longer than 6 characters')
  }

  if (passWord.value != confpassWord.value) {
    errMessage.push('*Passwords must match')
  }

  if (errMessage.length > 0) {
    e.preventDefault()
    regError.innerText = errMessage.join('\n')
  }

}); */

const registerh1 = document.querySelector('.register-h1');
const stopInAndOut = document.querySelector('.inandout-btn');

stopInAndOut.addEventListener('click', (e) => {
  e.preventDefault();
  registerh1.classList.toggle('inandout');
});
/* end register form */

/* index */
function myFunction() {
  var x = document.getElementById('myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

function myFunction2() {
  var x = document.getElementById('myLinks2');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
/* end index */

/* sign in */
const signForm = document.querySelector('#sign-form');
const resetForm = document.querySelector('#signin-resetpass');

signForm.addEventListener('submit', (e) => {
  let errMessage = [];

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (document.querySelector('#email-only').value.match(mailformat)) {
    errMessage.push('Success. Please check your email to reset your password.');
    swapSignIn();
  }
});

function swapSignIn() {
  var x = document.getElementById('signin-container');
  var y = document.getElementById('signin-resetpass');
  if (x.style.display === 'none') {
    x.style.display = 'block';
    y.style.display = 'none';
  } else {
    x.style.display = 'none';
    y.style.display = 'block';
  }
}

function cancelReset() {
  document.getElementById('signin-container').style.display = 'block';
  document.getElementById('signin-resetpass').style.display = 'none';
  document.getElementById('signin-resetpass-text').style.display = 'none';
}
/* end sign in */

/* cart page */
function upValue(x) {
  let y = '';
  if (x == '#item1') {
    y = '#amount1';
  } else {
    y = '#amount2';
  }
  x = document.querySelector(x);
  var value = parseInt(x.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  x.value = value;
  itemAmount(x.value, y);
}

function downValue(x) {
  let y = '';
  if (x == '#item1') {
    y = '#amount1';
  }
  if (x == '#item2') {
    y = '#amount2';
  }
  x = document.querySelector(x);
  var value = parseInt(x.value, 10);
  value = isNaN(value) ? 0 : value;
  value = value < 1 ? 1 : value;
  value--;
  x.value = value;
  itemAmount(x.value, y);
}

function itemAmount(x, y) {
  let num = 0;
  if (y == '#amount1') {
    num = 289.99;
  }
  if (y == '#amount2') {
    num = 40.99;
  }
  y = document.querySelector(y);
  let total = num * x;
  total = Number.parseFloat(total).toFixed(2);
  y.innerHTML = '$' + total;

  subTotalItems();

  subTotal();
}

function subTotalItems() {
  let quantity1 = 0;
  let quantity2 = 0;
  let total = document.querySelector('.Subtotal');
  if (document.querySelector('.removeItem1').innerHTML != '') {
    quantity1 = document.querySelector('#item1').value;
  } else {
    quantity1 = 0;
  }
  if (document.querySelector('.removeItem2').innerHTML != '') {
    quantity2 = document.querySelector('#item2').value;
  } else {
    quantity2 = 0;
  }
  let sum = parseInt(quantity1) + parseInt(quantity2);

  total.innerHTML = 'Sub-Total (' + sum + ' items): ';
}

function subTotal() {
  let total = document.querySelector('.total-amount');
  let valueItem1 = '';
  let valueItem2 = '';

  if (document.querySelector('.removeItem1').innerHTML != '') {
    valueItem1 = document.querySelector('#amount1').innerHTML;
    valueItem1 = valueItem1.substring(1);
  } else {
    valueItem1 = '0';
  }
  if (document.querySelector('.removeItem2').innerHTML != '') {
    valueItem2 = document.querySelector('#amount2').innerHTML;
    valueItem2 = valueItem2.substring(1);
  } else {
    valueItem2 = 0;
  }
  let sum = parseFloat(valueItem1) + parseFloat(valueItem2);
  sum = Number.parseFloat(sum).toFixed(2);
  total.innerHTML = '$' + sum;
}

function removeItem() {
  document.querySelector('.removeItem1').innerHTML = '';
  subTotalItems();
  subTotal();
}

function removeItem2() {
  document.querySelector('.removeItem2').innerHTML = '';
  subTotalItems();
  subTotal();
}

function removeAll() {
  document.querySelector('.removeItem1').innerHTML = '';
  document.querySelector('.removeItem2').innerHTML = '';
  alert('Congratulations, you just won 10 percent off your next order! Check your email for details!');
  subTotalItems();
  subTotal();
}

function scaleImg(x) {
  x.style.height = '240px';
  x.style.width = '250px';
}

function staticImg(x) {
  x.style.height = '120px';
  x.style.width = '125px';
}

/* end cart page */
