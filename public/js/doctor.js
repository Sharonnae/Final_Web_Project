async function acceptOrder(orderId) {
    const res = await axios.get(`/doctor/acceptOrder/${orderId}`)
    if (res.data.status === 'success') {
        window.location.href = '/doctor'
    }
}

async function declineOrder(orderId) {
    const res = await axios.get(`/doctor/declineOrder/${orderId}`)
    if (res.data.status === 'success') {
        window.location.href = '/doctor'
    }
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }
  
  let date = document.getElementById("date_temp").value;
  
  date = new Date(date)
  
  document.getElementById("appointment_date").innerHTML = formatDate(date);