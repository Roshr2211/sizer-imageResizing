# Sizer - Image resizing 

Sizer is an image resizing microservice with a React frontend and Golang backend

### Dependencies
Install [Golang](https://go.dev)

[Node.js](https://nodejs.org/en) must be installed to use node package manager (npm)

## Aathil's Execution guide
Download or git clone to local, cd into the project direcrory and run
```
npm install
```
to install required node modules

Start the server
```
cd Server
go run main.go
```
To run the web app, run
```
npm start
```

## Planned Features
- Support for `.png` and `.jpeg`
- Image upload area (drag n drop)
- Image renaming field
- Image custom dimensions fields
- Dimension presets
- Resized Image Download
- Image will not be saved in server