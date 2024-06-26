document.addEventListener("DOMContentLoaded", function () {

    // Black and light mode code ============ start =====>
    const toggleBtn = document.querySelector(".toggleBtn");
    const header = document.querySelector("header");

    // Cache frequently used elements
    const svgElements = document.querySelectorAll("svg");
    const svg1 =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    const svg2 =
        '<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    let isSvg1 = true;

    function toggleDarkMode() {
        document.body.classList.toggle("light-mode");
        const isDarkMode = document.body.classList.contains("light-mode");
        if (isDarkMode) {
            // Set light mode styles
            document.documentElement.style.setProperty("--primary-color", "#fff");
            document.documentElement.style.setProperty("--secondry-color", "#fff");
            document.documentElement.style.setProperty("--white", "#000");
            header.style.backgroundColor = "#fff";
        } else {
            // Set dark mode styles
            document.documentElement.style.setProperty("--primary-color", "#002737");
            document.documentElement.style.setProperty("--secondry-color", "#00212e");
            document.documentElement.style.setProperty("--white", "#fff");
            header.style.backgroundColor = "";
            document.body.style.backgroundColor = "";
        }
    }
    toggleBtn.addEventListener("click", toggleDarkMode);


    // Sticky header on scroll ============ start =====>
    const stickyHeader = document.querySelector("header");
    function handleScroll() {
        if (window.scrollY > 0) {
            stickyHeader.classList.add("sticky-header");
        } else {
            stickyHeader.classList.remove("sticky-header");
        }
    }
    // Debounce scroll event for performance optimization
    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedScroll);


    // Mobile menu code ============ start =====>
    const searchIcon = document.querySelector(".search-icon");
    const searchForm = document.querySelector(".search-form");
    let isSvg1 = true;
    searchIcon.addEventListener("click", function () {
        searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
        isSvg1 = !isSvg1;
        searchForm.classList.toggle("search-bar-show");
    });

    const toggleslideBtn = document.querySelector(".toggle-slide-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const headerUl = document.querySelector("header ul");

    function toggleButtons(toggleslideBtn, cancelBtn, headerUl) {
        headerUl.classList.toggle("show-ul");
        toggleslideBtn.style.display = toggleslideBtn.style.display === "none" ? "block" : "none";
        cancelBtn.style.display = cancelBtn.style.display === "block" ? "none" : "block";
    }

    toggleslideBtn.addEventListener("click", function () {
        toggleButtons(toggleslideBtn, cancelBtn, headerUl);
    });

    cancelBtn.addEventListener("click", function () {
        toggleButtons(toggleslideBtn, cancelBtn, headerUl);
    });


    // Mobile Dropdown ============ start =====>
    const dropdowns = document.querySelectorAll(".dropdown");
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        const li = e.target.parentNode;
        dropdowns.forEach((dropdown) => {
            if (dropdown !== li && !dropdown.contains(li)) {
                dropdown.classList.remove("showMenu");
            }
        });
        li.classList.toggle("showMenu");
    }
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", toggleDropdown);
    });
    document.addEventListener("click", (e) => {
        const targetElement = toggleslideBtn.querySelector(e.target.tagName);
        if (
            ![...dropdowns].some((dropdown) => dropdown.contains(e.target)) &&
            !targetElement
        ) {
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("showMenu");
            });
        }
    });


    // Scroll to top ============ start =====>
    const mybutton = document.getElementById("myBtn");
    window.addEventListener("scroll", scrollFunction);
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    mybutton.addEventListener("click", topFunction);


    // Table Of Content ============ start =====>
    const tableHeader = document.querySelector(".toc-header");
    const tableCrossBtn = document.querySelector(".arrow");
    const tableOfcontentBody = document.querySelector(".tableofcontent .toc-body");

    function isMobileDevice() {
        return window.innerWidth <= 768; // Adjust the width as needed
    }
    function hideTableOfContentOnMobile() {
        if (isMobileDevice()) {
            tableOfcontentBody.classList.add("hidden");
        }
    }
    hideTableOfContentOnMobile();
    tableHeader.addEventListener("click", function () {
        if (tableOfcontentBody.classList.contains("hidden")) {
            tableOfcontentBody.classList.remove("hidden");
            tableCrossBtn.style.transform = "rotate(0deg)";
        } else {
            tableOfcontentBody.classList.add("hidden");
            tableCrossBtn.style.transform = "rotate(270deg)";
        }
    });
    window.addEventListener("resize", hideTableOfContentOnMobile);

    const tableOfContentItems = document.querySelectorAll(".tableofcontent ul li a");
    tableOfContentItems.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetElement.offsetTop - 100;
            const top = offset > 0 ? offset : 0;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const targetId = entry.target.getAttribute("id");
                const link = document.querySelector(`.tableofcontent ul li a[href="#${targetId}"]`);
                if (entry.isIntersecting) {
                    link?.parentElement.classList.add("active");
                } else {
                    link?.parentElement.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((element) => {
        observer.observe(element);
    });


    // Accordion code ============ start =====>
    const detailsElements = document.querySelectorAll("details");
    const summaryElements = document.querySelectorAll("summary");
    summaryElements.forEach((summary, index) => {
        summary.addEventListener("click", () => {
            detailsElements.forEach((details, i) => {
                if (i !== index) {
                    details.open = false;
                }
            });
        });
    });

});


// Debounce function for scroll event
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
