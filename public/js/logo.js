function draw() {
    const canvas = document.getElementById("mycanvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.font = "bold 24px sans-serif";
      ctx.shadowColor = "rgb(190, 190, 190)";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      var gradient = ctx.createLinearGradient(0, 0, 150, 100);
gradient.addColorStop(0, "rgb(255, 0, 0)");
gradient.addColorStop(1, "rgb(255, 255, 0)");
ctx.fillStyle = gradient;
      ctx.fillText("Hospital Management System", 10, 40)

    }
  }