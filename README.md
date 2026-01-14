# MoGify
MoGify is a simple and powerful screen recorder that helps you capture, trim, and preview your recordings effortlessly

git clone https://github.com/your-username/MoGify.git
cd MoGify
# Install dependencies
cd server && npm install
cd ../client && npm install
# Run backend
npm start

# Run frontend
npm start
📡 Recorder API (Quick Overview)
Upload Video
POST /api/upload
Uploads a recorded .webm file and returns a unique video ID.

Get Analytics
GET /api/analytics/:videoId
Returns view count and completion data.

Update Views
POST /api/analytics/view/:videoId
Increments video view count.

📂 Project Structure
MoGify/
├── client/        # React frontend
├── server/        # Node.js backend
├── README.md
└── .gitignore
🌱 Future Improvements
Cloud storage (S3 / R2)

AI-powered trimming

Auto captions

User authentication

output
----------------------

<img width="1916" height="833" alt="Image" src="https://github.com/user-attachments/assets/90009e33-eac4-4f1c-b89c-b8507d7c7494" />
<img width="1917" height="920" alt="Image" src="https://github.com/user-attachments/assets/6d561583-34fc-4ef5-a7cf-aefe24d42aa1" />
<img width="1919" height="894" alt="Image" src="https://github.com/user-attachments/assets/1bd64cc5-7355-42f1-ba3a-94f8787a4e9b" />
<img width="1919" height="887" alt="Image" src="https://github.com/user-attachments/assets/5811a17b-3442-461a-8c90-faa661ff6149" />
<img width="1919" height="901" alt="Image" src="https://github.com/user-attachments/assets/9b93ae12-a493-4071-b339-48801fbfb72e" />
<img width="1882" height="827" alt="Image" src="https://github.com/user-attachments/assets/59560aed-f84e-4f29-82e1-85f22850073c" />
<img width="1394" height="799" alt="Image" src="https://github.com/user-attachments/assets/9acc2376-5adf-4087-b792-d32cb44a89a2" />
