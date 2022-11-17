
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

async function setAppointment(doctorId) {
  console.log('set')
  const dateTime = document.getElementById(`appointment${doctorId}`).value;
  const temp = new Date(dateTime)
  if (!dateTime) {
    alert("Please enter your disease!");
  } else {
    console.log(formatDate(temp))
    const dateData = formatDate(temp)
    const res = await axios.post("/patient/setAppointment", {
      doctorId: doctorId,
      dateTime: dateData,
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
  if (sortField === "expertise") {
    if (l === "default") return expertiseSort(data, e);
    return expertiseSort(locationSort(data, l), e);
  } else if (sortField === "location") {
    if (e === "default") return locationSort(data, l);
    return locationSort(expertiseSort(data, e), l);
  } else if (sortField === "search") {
    if (e === "default" && l === "default") return data;
    else if (e === "default") return locationSort(data, l);
    else if (l === "default") return expertiseSort(data, e);
    else return expertiseSort(locationSort(data, l), e);
  }
}

async function sortData(sortField) {
  const doctors = (await axios.get("/doctor/getDoctorData")).data.doctors;
  const locationSortPart = document.getElementById("locationSort");
  const expertiseSortPart = document.getElementById("expertiseSort");
  const searchField = document.getElementById("searchField");
  const expertiseSortStatus = getSortStatus(expertiseSortPart.className);
  const locationSortStatus = getSortStatus(locationSortPart.className);
  const searchFieldValue = searchField.value;
  let currentStatus = {
    expertise: "default",
    location: "default",
  };
  if (sortField === "search") {
    currentStatus.expertise = expertiseSortStatus;
    currentStatus.location = locationSortStatus;
  }
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
  const searchingData = doctors.filter(function (doctor) {
    return (
      doctor.fullname.toUpperCase().includes(searchFieldValue.toUpperCase()) ||
      doctor.expertise.toUpperCase().includes(searchFieldValue.toUpperCase()) ||
      doctor.location.toUpperCase().includes(searchFieldValue.toUpperCase())
    );
  });
  const sortingData = customSort(
    searchingData,
    currentStatus.expertise,
    currentStatus.location,
    sortField
  );
  console.log("sort", sortingData);

  let content = "";

  if (sortingData.length === 0) {
    content = `<div class="p-3 mt-2 d-flex w-100 justify-content-center">No result</div>`;
  } else {
    sortingData.forEach((data) => {
      content += `
                <div class="p-3 mt-2"
                  style="width: 100%; min-width: 600px; border-radius: 8px; background-color: rgb(64 66 65); color: white;">
                  <div class="row">
                    <div class="col-3 d-flex align-items-center">
                      <div class="mr-2" style="border-radius: 50%; width: 40px; height: 40px; overflow: hidden;">
                        <img src="/avatar/${data.avatar}" style="width: 100%; height: 100%;">
                      </div>
                      <a href="#" style="text-decoration: underline;">
                        ${data.fullname}
                      </a>
                    </div>
                    <div class="col-2 d-flex align-items-center">
                      ${data.expertise}
                    </div>
                    <div class="col-3 d-flex align-items-center">
                      ${data.location}
                    </div>
                    <div class="col-2 d-flex align-items-center">
                      ${data.phone}
                    </div>
                    <div class="col-2 d-flex align-items-center">
                      <button type="button" class="btn btn-sm btn-danger" data-toggle="modal"
                        data-target="#disease${data._id}">
                        Suggest
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" id="disease${data._id}" tabindex="-1" role="dialog"
                        aria-labelledby="disease${data._id}" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content" style="background-color: #79ccc2;">
                            <div class="modal-body">
                              <label class="form-control-label">Please input available time</label>
                              <input type="datetime-local" id="appointment${data._id}" class="form-control">
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-success btn-sm" data-dismiss="modal"
                                onclick="setAppointment(${data._id})">Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      `;
    });
  }

  document.getElementById('listPart').innerHTML = content
}
