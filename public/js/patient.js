async function setAppointment(doctorId) {
  const dateTime = document.getElementById(`appointment${doctorId}`).value;
  if (!dateTime) {
    alert("Please enter your disease!");
  } else {
    const res = await axios.post("/patient/setAppointment", {
      doctorId: doctorId,
      dateTime: dateTime,
    });

    if (res.data.status === "success") {
      alert("Order is made successfully");
    }
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
