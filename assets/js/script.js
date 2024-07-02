$(document).ready(function () {
    $("#menu").click(function () {
      $(this).toggleClass("fa-times");
      $(".navbar").toggleClass("nav-toggle");
    });
  
    $(window).on("scroll load", function () {
      $("#menu").removeClass("fa-times");
      $(".navbar").removeClass("nav-toggle");
  
      if (window.scrollY > 60) {
        document.querySelector("#scroll-top").classList.add("active");
      } else {
        document.querySelector("#scroll-top").classList.remove("active");
      }
  
      // scroll spy
      $("section").each(function () {
        let height = $(this).height();
        let offset = $(this).offset().top - 200;
        let top = $(window).scrollTop();
        let id = $(this).attr("id");
  
        if (top > offset && top < offset + height) {
          $(".navbar ul li a").removeClass("active");
          $(".navbar").find(`[href="#${id}"]`).addClass("active");
        }
      });
    });
  
    // smooth scrolling
    $('a[href*="#"]').on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top,
        },
        500,
        "linear"
      );
    });
  
    // emailjs to mail contact form data
    $("#contact-form").submit(function (event) {
      emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
  
      emailjs
        .sendForm("contact_service", "template_contact", "#contact-form")
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("contact-form").reset();
            alert("Form Submitted Successfully");
          },
          function (error) {
            console.log("FAILED...", error);
            alert("Form Submission Failed! Try Again");
          }
        );
      event.preventDefault();
    });
  
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        document.title = "Portfolio | Shray Srivastava";
        $("#favicon").attr("href", "assets/images/favicon.png");
      } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
      }
    });
  
    // typed js effect starts
    var typed = new Typed(".typing-text", {
      strings: [
        "Solving Complex Problems.",
        "Building Innovative Solutions.",
        "Empowering Users with Tech.",
        "Making Impactful Software.",
        "Crafting Seamless Experiences."
      ],
      loop: true,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
    });
    // typed js effect ends
  
    async function fetchData(type = "skills") {
      let response;
      type === "skills"
        ? (response = await fetch("skills.json"))
        : (response = await fetch("./projects/projects.json"));
      const data = await response.json();
      return data;
    }
  
    function showSkills(skills) {
      let skillsContainer = document.getElementById("skillsContainer");
      let skillHTML = "";
      skills.forEach((skill) => {
        skillHTML += `
          <div class="bar">
                <div class="info">
                  <img src=${skill.icon} alt="skill" />
                  <span>${skill.name}</span>
                </div>
              </div>`;
      });
      skillsContainer.innerHTML = skillHTML;
    }
  
    function showProjects(projects) {
      let projectsContainer = document.querySelector("#work .box-container");
      let projectHTML = "";
      projects.forEach((project) => {
        let viewButton = project.links.view
          ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`
          : "";
        let codeButton = project.links.code
          ? `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`
          : "";
  
        projectHTML += `
          <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
              <div class="tag">
                <h3>${project.name}</h3>
              </div>
              <div class="desc">
                <p>${project.desc}</p>
                <div class="btns">
                  ${viewButton}
                  ${codeButton}
                </div>
              </div>
            </div>
          </div>`;
      });
      projectsContainer.innerHTML = projectHTML;
  
      // tilt js effect starts
      VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
      });
      // tilt js effect ends
  
      
  
      // scroll reveal animation
      const srtop = ScrollReveal({
        origin: "top",
        distance: "80px",
        duration: 1000,
        reset: true,
      });
  
      // scroll projects
      srtop.reveal(".work .box", { interval: 200 });
    }
  
    function toggleDetails(container) {
        const details = container.querySelector('.details');
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
      }
      
    fetchData().then((data) => {
      showSkills(data);
    });
  
    fetchData("projects").then((data) => {
      showProjects(data);
    });
  
    // tilt js effect starts
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15,
    });
    // tilt js effect ends
  
    // disable developer mode
    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
      }
    };
  
    // scroll reveal animation
    const srtop = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 1000,
      reset: true,
    });
  
    // scroll home
    srtop.reveal(".home .content h3", { delay: 200 });
    srtop.reveal(".home .content p", { delay: 200 });
    srtop.reveal(".home .content .btn", { delay: 200 });
  
    srtop.reveal(".home .image", { delay: 400 });
    srtop.reveal(".home .linkedin", { interval: 600 });
    srtop.reveal(".home .github", { interval: 800 });
    srtop.reveal(".home .twitter", { interval: 1000 });
    srtop.reveal(".home .telegram", { interval: 600 });
    srtop.reveal(".home .instagram", { interval: 600 });
    srtop.reveal(".home .dev", { interval: 600 });
  
    // scroll about
    srtop.reveal(".about .content h3", { delay: 200 });
    srtop.reveal(".about .content .tag", { delay: 200 });
    srtop.reveal(".about .content p", { delay: 200 });
    srtop.reveal(".about .content .box-container", { delay: 200 });
    srtop.reveal(".about .content .resumebtn", { delay: 200 });
  
    // scroll skills
    srtop.reveal(".skills .container", { interval: 200 });
    srtop.reveal(".skills .container .bar", { delay: 400 });
  
    // scroll education
    srtop.reveal(".education .box", { interval: 200 });
  
    // scroll projects
    srtop.reveal(".work .box", { interval: 1000 });
  
    // scroll experience
    srtop.reveal(".experience .timeline", { delay: 400 });
    srtop.reveal(".experience .timeline .container", { interval: 1000 });
  
    // scroll contact
    srtop.reveal(".contact .container", { delay: 400 });
    srtop.reveal(".contact .container .form-group", { delay: 400 });
  
    // Event listener for experience timeline
    document.querySelectorAll('.experience .container').forEach(container => {
      container.addEventListener('click', () => toggleDetails(container));
    });
  });
  