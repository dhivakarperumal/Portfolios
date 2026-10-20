const myServices = [
    {
        number: "01",
        title: "Web Development",
        description: "Modern, responsive & SEO-friendly websites built with React.js and cutting-edge technologies.",
        icon: "fas fa-globe",
        color: "#6c63ff",
        gradient: ["#6c63ff", "#4ecdc4"],
        tags: ["React.js", "JavaScript", "Responsive"],
        delay: 100
    },
    {
        number: "02",
        title: "Mobile App Development",
        description: "Cross-platform Android applications using React Native with high performance & native UX.",
        icon: "fas fa-mobile-alt",
        color: "#ff6b9d",
        gradient: ["#ff6b9d", "#c44dff"],
        tags: ["React Native", "Android", "Cross-Platform"],
        delay: 150
    },
    {
        number: "03",
        title: "Full Stack Development",
        description: "Complete frontend, backend, database & API development for scalable, production-ready applications.",
        icon: "fas fa-layer-group",
        color: "#4ecdc4",
        gradient: ["#4ecdc4", "#44a3fc"],
        tags: ["Django", "MySQL", "REST API"],
        delay: 200
    },
    {
        number: "04",
        title: "E-Commerce Solutions",
        description: "Online stores with secure authentication, payment gateways & complete order management systems.",
        icon: "fas fa-shopping-cart",
        color: "#f7971e",
        gradient: ["#f7971e", "#ffd200"],
        tags: ["Payments", "Auth", "Orders"],
        delay: 250
    },
    {
        number: "05",
        title: "Food Delivery Solutions",
        description: "Complete food ordering platforms with Admin, Home Chef, User & Delivery Partner modules.",
        icon: "fas fa-utensils",
        color: "#ff6b6b",
        gradient: ["#ff6b6b", "#ffa07a"],
        tags: ["Admin Panel", "Delivery", "Real-time"],
        delay: 300
    },
    {
        number: "06",
        title: "API Integration",
        description: "Payment gateways, OTP, WhatsApp, SMS, email services & third-party API integrations.",
        icon: "fas fa-plug",
        color: "#11998e",
        gradient: ["#11998e", "#38ef7d"],
        tags: ["Payment API", "WhatsApp", "SMS & OTP"],
        delay: 350
    },
    {
        number: "07",
        title: "Admin Dashboard",
        description: "Powerful dashboards with analytics, user management, reports & role-based access control.",
        icon: "fas fa-tachometer-alt",
        color: "#764ba2",
        gradient: ["#764ba2", "#667eea"],
        tags: ["Analytics", "Role-Based", "Reports"],
        delay: 400
    },
    {
        number: "08",
        title: "Maintenance & Support",
        description: "Ongoing updates, bug fixes, performance optimization & dedicated technical support.",
        icon: "fas fa-tools",
        color: "#fc5c7d",
        gradient: ["#fc5c7d", "#6a82fb"],
        tags: ["Bug Fixes", "Optimization", "Support"],
        delay: 450
    }
];

function escapeServiceHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];
    });
}

function renderServiceCard(service) {
    const safe = escapeServiceHtml;

    return '<div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="' + service.delay + '">' +
        '<div class="service-card" data-color="' + safe(service.color) + '">' +
        '<div class="service-card-glow"></div>' +
        '<div class="service-icon-wrap">' +
        '<div class="service-icon-bg" style="background: linear-gradient(135deg,' +
        safe(service.gradient[0]) + ',' + safe(service.gradient[1]) + ')">' +
        '<i class="' + safe(service.icon) + '"></i></div>' +
        '<div class="service-number">' + safe(service.number) + '</div></div>' +
        '<h4 class="service-title">' + safe(service.title) + '</h4>' +
        '<p class="service-desc">' + safe(service.description) + '</p>' +
        '<ul class="service-tags">' + service.tags.map(function (tag) {
            return '<li>' + safe(tag) + '</li>';
        }).join("") + '</ul>' +
        '<div class="service-arrow"><i class="fas fa-arrow-right"></i></div>' +
        '</div></div>';
}

const servicesGrid = document.getElementById("servicesGrid");

if (servicesGrid) {
    servicesGrid.innerHTML = myServices.map(renderServiceCard).join("");
}
