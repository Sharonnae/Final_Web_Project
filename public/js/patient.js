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

function getSortStatus(className) {
  if (className.includes("fa-sort-up")) return "up";
  else if (className.includes("fa-sort-down")) return "down";
  else if (className.includes("fa-sort")) return "default";
}

function expertiseSort(data, expertiseStatus) {
  if (expertiseStatus === "up") {
    return data.sort((a, b) => {
      const first = a.expertise.toUpperCase();
      const second = b.expertise.toUpperCase();
      if (first > second) return 1;
      if (first < second) return -1;
      return 0;
    });
  }
  if (expertiseStatus === "down") {
    return data.sort((a, b) => {
      const first = a.expertise.toUpperCase();
      const second = b.expertise.toUpperCase();
      if (first > second) return -1;
      if (first < second) return 1;
      return 0;
    });
  }
}

function locationSort(data, locationStatus) {
  if (locationStatus === "up") {
    return data.sort((a, b) => {
      const first = a.location.toUpperCase();
      const second = b.location.toUpperCase();
      if (first > second) return 1;
      if (first < second) return -1;
      return 0;
    });
  }
  if (locationStatus === "down") {
    return data.sort((a, b) => {
      const first = a.location.toUpperCase();
      const second = b.location.toUpperCase();
      if (first > second) return -1;
      if (first < second) return 1;
      return 0;
    });
  }
}

function customSort(data, expertiseStatus, locationStatus, sortField) {
  const e = expertiseStatus;
  const l = locationStatus;
  if (e === "default") {
    return locationSort(data, l);
  } else if (l === "default") {
    return expertiseSort(data, e);
  } else {
    if (sortField === "expertise") {
      return expertiseSort(locationSort(data, l), e);
    }
    if (sortField === "location") {
      return locationSort(expertiseSort(data, e), l);
    }
  }
}

async function sortData(sortField) {
  const doctors = (await axios.get("/doctor/getDoctorData")).data.doctors;
  const locationSortPart = document.getElementById("locationSort");
  const expertiseSortPart = document.getElementById("expertiseSort");
  const expertiseSortStatus = getSortStatus(expertiseSortPart.className);
  const locationSortStatus = getSortStatus(locationSortPart.className);
  let currentStatus = {
    expertise: "",
    location: "",
  };
  if (sortField === "expertise") {
    currentStatus.location = locationSortStatus;
    if (expertiseSortStatus === "default") {
      expertiseSortPart.classList.remove("fa-sort");
      expertiseSortPart.classList.add("fa-sort-up");
      currentStatus.expertise = "up";
    }
    if (expertiseSortStatus === "up") {
      expertiseSortPart.classList.remove("fa-sort-up");
      expertiseSortPart.classList.add("fa-sort-down");
      currentStatus.expertise = "down";
    }
    if (expertiseSortStatus === "down") {
      expertiseSortPart.classList.remove("fa-sort-down");
      expertiseSortPart.classList.add("fa-sort-up");
      currentStatus.expertise = "up";
    }
  }
  if (sortField === "location") {
    currentStatus.expertise = expertiseSortStatus;
    if (locationSortStatus === "default") {
      locationSortPart.classList.remove("fa-sort");
      locationSortPart.classList.add("fa-sort-up");
      currentStatus.location = "up";
    }
    if (locationSortStatus === "up") {
      locationSortPart.classList.remove("fa-sort-up");
      locationSortPart.classList.add("fa-sort-down");
      currentStatus.location = "down";
    }
    if (locationSortStatus === "down") {
      locationSortPart.classList.remove("fa-sort-down");
      locationSortPart.classList.add("fa-sort-up");
      currentStatus.location = "up";
    }
  }
  const sortingData = customSort(doctors, currentStatus.expertise, currentStatus.location, sortField)
  console.log('sort', sortingData)
}
