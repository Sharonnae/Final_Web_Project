let uploadPart = document.getElementById("custom_upload");
let hiddenPart = document.getElementById("file_input");

uploadPart.addEventListener("click", function () {
  hiddenPart.click();
});

uploadPart.addEventListener("change", function (e) {
  let img = document.getElementById("img");
  if (e.target.files && e.target.files[0]) {
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(e.target.files[0]);
  }
});


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

function resetAvatar(name) {
  let img = document.getElementById("img");
  img.src = `/avatar/${name}`;
}

function uploadAvatar() {
  let formData = new FormData();
  if (hiddenPart.files[0]) {
    formData.append("files", hiddenPart.files[0]);
    axios.post("/profileUpdate/uploadAvatar", formData);
  } else {
    alert("Please choose avatar");
    return;
  }
}

async function changePassword() {
  let currentPassword = document.getElementById("currentPwd").value;
  let newPassword = document.getElementById("newPwd").value;
  let confirmPassword = document.getElementById("confirmPwd").value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Please fill all fields correctly");
  } else {
    if (newPassword !== confirmPassword) {
      alert("Please confirm your password correctly");
    } else {
      const data = {
        currentPwd: currentPassword,
        newPwd: newPassword,
      };
      const res = await axios.post("/profileUpdate/changePassword", data);
      if (res.data.status === 'success') {
        let snackbar = document.getElementById('successSnackbar')
        snackbar.className = "show"
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        resetPassword()
      } else if (res.data.status === 'error') {
        let snackbar = document.getElementById('errorSnackbar')
        snackbar.className = "show"
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        resetPassword()
      }
    }
  }
}

function resetPassword() {
  let currentPasswordInput = document.getElementById("currentPwd");
  let newPasswordInput = document.getElementById("newPwd");
  let confirmPasswordInput = document.getElementById("confirmPwd");

  currentPasswordInput.value = "";
  newPasswordInput.value = "";
  confirmPasswordInput.value = "";
}

async function profileUpdate() {
  let phone = document.getElementById('phone').value
  let location = document.getElementById('format_address').value
  let latitude = document.getElementById('user_lat').value
  let longitude = document.getElementById('user_lng').value

  if (!phone || !location || !latitude || !longitude) {
    alert('Please fill all fields correctly')
  } else {
    const res = await axios.post('/profileUpdate/changeProfile', {
      phone: phone,
      location: location,
      latitude: latitude,
      longitude: longitude
    })
    if (res.data.status === 'success') {
      if (res.data.role === 'doctor') {
        window.location.href = '/doctor/profile'
      } else {
        window.location.href = '/patient/profile'
      }
    }
  }
}

function resetProfile( phone, location, latitude, longitude ) {
  document.getElementById('phone').value = phone
  document.getElementById('format_address').value = location
  document.getElementById('user_lat').value = latitude
  document.getElementById('user_lng').value = longitude
}
