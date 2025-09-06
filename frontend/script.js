document.getElementById("uploadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const fileInput = document.getElementById("resumeFile");
  const jobDesc = document.getElementById("jobDesc").value;
  const resultsDiv = document.getElementById("results");

  if (!fileInput.files.length) {
    alert("⚠️ Please upload a resume file before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("job_desc", jobDesc);

  // Show loading state
  resultsDiv.classList.remove("hidden");
  resultsDiv.innerHTML = `<p style="color:#007bff;">⏳ Analyzing resume... please wait.</p>`;

  try {
    const res = await fetch("http://127.0.0.1:8000/analyze/", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Server error: " + res.status);

    const data = await res.json();

    // Build results HTML
    let html = `<h2>📊 Analysis Results</h2>
      <p><strong>ATS Score:</strong> <span style="color:#007bff;">${(data.ats_score * 100).toFixed(0)}%</span></p>`;
    
    if (data.job_fit) {
      html += `<p><strong>Job Fit Score:</strong> <span style="color:#28a745;">${(data.job_fit.combined_score * 100).toFixed(0)}%</span></p>`;
    }

    html += "<h3>📝 Recommendations:</h3><ul>";
    data.recommendations.forEach(r => {
      html += `<li>✅ ${r}</li>`;
    });
    html += "</ul>";

    resultsDiv.innerHTML = html;

  } catch (err) {
    resultsDiv.innerHTML = `<p style="color:red;">❌ Error: ${err.message}</p>`;
  }
});
