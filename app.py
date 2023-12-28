import requests
from jinja2 import Template

# Step 1: Fetch data from the first API
api_url = "https://table-data.onrender.com/scrape"
response = requests.get(api_url)
job_listings = response.json()

# Step 2: Process each job listing
for job in job_listings[1:]:  # Skipping the header row
    job_id = job[0]
    job_api_url = f"https://table-data.onrender.com/scrape?{job_id}"
    job_response = requests.get(job_api_url)
    job_data = job_response.json()

    # Extract relevant information
    location = job_data[0]
    state = job_data[1]
    image_url = job_data[2]
    job_description = job_data[3][1]

    # Step 3: Create the HTML template
    template_str = """
    <html>
    <body>
        <h1>New Job Listing!</h1>
        <p><strong>Location:</strong> {{ location }}, {{ state }}</p>
        <img src="{{ image_url }}" alt="Hospital Image">
        <p>{{ job_description }}</p>
        <p>Apply now!</p>
    </body>
    </html>
    """

    # Step 4: Render the template with job data
    template = Template(template_str)
    email_body = template.render(location=location, state=state, image_url=image_url, job_description=job_description)

    # Step 5: Send the email or save the HTML to a file
    # For simplicity, printing the email body in this example
    print(email_body)
