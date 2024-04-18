package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/disintegration/imaging"
	"os"
	"image"
)

func saveOriginalImage(img *image.NRGBA, outputPath string) {
	output, err := os.Create(outputPath)
	if err != nil {
		log.Fatalf("failed to create output file %s: %v", outputPath, err)
	}
	defer output.Close()

	// Encode the resized image as PNG.
	err = imaging.Encode(output, img, imaging.PNG)
	if err != nil {
		log.Fatalf("failed to encode image: %v", err)
	}
}

func resizeImageCustom(src *image.NRGBA, width, height int) *image.NRGBA {
	return imaging.Resize(src, width, height, imaging.Lanczos)
}

func GetHandler(w http.ResponseWriter, r *http.Request) {
	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error reading request body: %v", err),
			http.StatusInternalServerError)
		return
	}
	defer file.Close()

	src, err := imaging.Decode(file)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding image: %v", err),
			http.StatusInternalServerError)
		return
	}

	srcNRGBA := imaging.Clone(src) 

	saveOriginalImage(srcNRGBA, "Images\\Original\\original.png")

	fmt.Fprintf(w, "GET method invoked")
}

func ResizeHandler(w http.ResponseWriter, r *http.Request) {
	srcFile, err := os.Open("Images\\Original\\original.png")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error opening original image file: %v", err),
			http.StatusInternalServerError)
		return
	}
	defer srcFile.Close()

	src, err := imaging.Decode(srcFile)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error decoding original image file: %v", err),
			http.StatusInternalServerError)
		return
	}

	srcNRGBA := imaging.Clone(src)
	customImage := resizeImageCustom(srcNRGBA, 300, 200)

	err = imaging.Encode(w, customImage, imaging.JPEG)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error encoding image: %v", err),
			http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Resize method invoked")
}

func main(){
	fileServer := http.FileServer((http.Dir("./api")))
	http.Handle("/", fileServer)
	http.HandleFunc("/Upload", GetHandler)
	http.HandleFunc("/Resize", ResizeHandler)

	fmt.Printf("Server started at Port number : 8000\n")

	if err := http.ListenAndServe(":8000",nil); err !=nil {
		log.Fatal(err)
	}
}
