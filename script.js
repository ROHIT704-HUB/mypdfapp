document.getElementById("freeBtn").addEventListener("click", () => {
  loadContent("free");
});

document.getElementById("premiumBtn").addEventListener("click", () => {
  loadContent("premium");
});

function loadContent(type) {
  fetch("content.json")
    .then((res) => res.json())
    .then((data) => {
      const subjects = data[type];
      const contentArea = document.getElementById("contentArea");
      contentArea.innerHTML = ""; // Clear previous view

      const backBtn = document.createElement("button");
      backBtn.innerText = "🔙 Back";
      backBtn.className = "back-button";
      backBtn.onclick = () => {
        contentArea.innerHTML = "";
      };
      contentArea.appendChild(backBtn);

      for (const subject in subjects) {
        const subjectDiv = document.createElement("div");
        subjectDiv.className = "subject";
        const title = document.createElement("h3");
        title.textContent = subject;
        subjectDiv.appendChild(title);

        subjects[subject].forEach((file) => {
          const link = document.createElement("a");
          link.href = file.url;
          link.textContent = file.name;
          link.className = "pdf-link";
          link.target = "_blank";
          subjectDiv.appendChild(link);
        });

        contentArea.appendChild(subjectDiv);
      }
    });
}
