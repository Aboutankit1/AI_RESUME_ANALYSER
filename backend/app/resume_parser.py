def analyze_resume(path, jd_text=None):
    return {
        "ats_score": 0.82,
        "job_fit": {"combined_score": 0.73} if jd_text else None,
        "recommendations": [
            "Add more role-specific keywords",
            "Use a standard 'Skills' section",
            "Avoid using tables or images in resume"
        ]
    }
