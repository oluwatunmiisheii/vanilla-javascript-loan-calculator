// listen for submits
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide result
  document.getElementById('result').style.display = 'none';

  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResult, 2000)
  
  e.preventDefault()
});

//calculate result function
function calculateResult() {

  // Ui variables
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2)
    UItotalPayment.value = (monthly*calculatedPayments).toFixed(2)
    UItotalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2)

    //Show Result
    document.getElementById('result').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
  }else{
    showError('Please check your numbers')
  }
};

// Show error
function showError(error) {

   //Show Result
   document.getElementById('result').style.display = 'none';

   // Hide loader
   document.getElementById('loading').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger'

  // Create textnopde and append to div
  errorDiv.appendChild(document.createTextNode(error))

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// clear error
function clearError() {
  document.querySelector('.alert').remove();
}