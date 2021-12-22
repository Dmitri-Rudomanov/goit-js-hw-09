import Notiflix from 'notiflix';

const refs = {
  delay:document.querySelector(`input[name="delay"]`),
  step:document.querySelector(`input[name="step"]`),
  amount: document.querySelector(`input[name="amount"]`),
  form:document.querySelector(".form")
}

refs.form.addEventListener("submit",onFormSubmit)
let delay = 0

function onFormSubmit(e) {
  e.preventDefault()
  for (var i = 1; i <= refs.amount.value; i++) {
    if (i === 1) {
      delay = parseInt(refs.delay.value)
    } else {
      delay += parseInt(refs.step.value)
    }
     createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
}

}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => { 
    const shouldResolve = Math.random() > 0.3;

  setInterval(() => { 
  if (shouldResolve) {
    // Fulfill
    resolve({position,delay});
  } else {
    // Reject
  reject({position,delay});
  }
    }, delay)
  })
}
// .then((result) => { Notiflix.Notify.success(result) })
//        .catch((error) => { Notiflix.Notify.failure(error) })
// }

// }

// function createPromise(position, delay) {
  
//   return new Promise((resolve, reject) => { 
//     const shouldResolve = Math.random() > 0.3;

    
//   setInterval(() => { 
//   if (shouldResolve) {
//     // Fulfill
//    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   } else {
//     // Reject
//   reject(`❌ Rejected promise ${position} in ${delay}ms`);
//   }
//     }, delay)
//   })
// }
