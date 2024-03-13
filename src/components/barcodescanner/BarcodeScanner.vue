<script lang="ts" setup>
import { ref } from "vue";
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from "@zxing/library";

const videoRef = ref();
const isUsingFrontCamera = ref(true);
const startCamera = (usingFrontCamera: boolean = true) => {
  isUsingFrontCamera.value = usingFrontCamera;

  // render webcam stream
  if (navigator.mediaDevices.getUserMedia) {
    // get user media based on frontCamera value
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: usingFrontCamera ? "user" : "environment" },
      })
      .then((stream) => {
        videoRef.value!.srcObject = stream;
      })
      .catch(console.error);
  }
};

const switchCamera = () => {
  // stop current stream
  videoRef.value.srcObject.getTracks().forEach((track: any) => track.stop());

  videoRef.value.srcObject = null;
  // start new stream
  startCamera(!isUsingFrontCamera.value);
};

type ImageData = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
};

function convertToLuminance(imageData: ImageData) {
  const pixels = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const luminanceData = new Uint8ClampedArray(width * height);

  // Convert RGB to luminance (grayscale)
  for (let i = 0, j = 0; i < pixels.length; i += 4, j++) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Use weighted average for perceived luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    luminanceData[j] = luminance;
  }

  return luminanceData;
}

const screenshot = () => {
  // create image from video and do not put it on the DOM so we can use it for barcode scanning
  // Pass the image to zXing for barcode scanning

  // take 10 screenshots after every frame
  // detect barcode from each screenshot
  // retrurn the most frequent barcode
  let screenshotCounter = 0;
  let scannedBarcodes: string[] = [];
  const promise = new Promise((resolve) => {
    const timer = setInterval(() => {
      if (screenshotCounter === 20) {
        clearInterval(timer);
      }
      screenshotCounter++;
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.value.videoWidth;
      canvas.height = videoRef.value.videoHeight;
      canvas
        .getContext("2d")!
        .drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
      const imageData = canvas
        .getContext("2d")!
        .getImageData(0, 0, canvas.width, canvas.height);

      const luminanceData = convertToLuminance(imageData);

      const binaryBitmap = new BinaryBitmap(
        new HybridBinarizer(
          new RGBLuminanceSource(
            luminanceData,
            imageData.width,
            imageData.height
          )
        )
      );
      const reader = new MultiFormatReader();
      const hints = new Map();

      // get all formats
      const formats = [
        BarcodeFormat.AZTEC,
        BarcodeFormat.CODABAR,
        BarcodeFormat.CODE_39,
        BarcodeFormat.CODE_93,
        BarcodeFormat.CODE_128,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.EAN_8,
        BarcodeFormat.EAN_13,
        BarcodeFormat.ITF,
        BarcodeFormat.MAXICODE,
        BarcodeFormat.PDF_417,
        BarcodeFormat.QR_CODE,
        BarcodeFormat.RSS_14,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.UPC_EAN_EXTENSION,
      ];
      hints.set(DecodeHintType.TRY_HARDER, 1000);
      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      reader.setHints(hints);
      try {
        const result = reader.decode(binaryBitmap);
        scannedBarcodes.push(result.getText());
        // console.log(result.getText());
      } catch (e) {
        // console.error(e);
      }

      // get the most frequent barcode
      const mostFrequentBarcode = scannedBarcodes.reduce(
        (acc: any, curr: any) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        },
        {}
      );
      // get the value of the most frequent barcode
      const mostFrequentBarcodeValue = Object.keys(mostFrequentBarcode).reduce(
        (a, b) => (mostFrequentBarcode[a] > mostFrequentBarcode[b] ? a : b)
      );

      resolve(mostFrequentBarcodeValue);
    }, 20);
  });

  promise.then((result) => {
    console.log("scanned:" + result);
  });

  // const canvas = document.createElement("canvas");
  // console.log(videoRef.value.videoWidth, videoRef.value.videoHeight);
  // canvas.width = videoRef.value.videoWidth;
  // canvas.height = videoRef.value.videoHeight;
  // canvas
  //   .getContext("2d")!
  //   .drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
  // const imageData = canvas
  //   .getContext("2d")!
  //   .getImageData(0, 0, canvas.width, canvas.height);

  // const luminanceData = convertToLuminance(imageData);

  // const binaryBitmap = new BinaryBitmap(
  //   new HybridBinarizer(
  //     new RGBLuminanceSource(luminanceData, imageData.width, imageData.height)
  //   )
  // );
  // const reader = new MultiFormatReader();
  // const hints = new Map();

  // // get all formats
  // const formats = [
  //   BarcodeFormat.AZTEC,
  //   BarcodeFormat.CODABAR,
  //   BarcodeFormat.CODE_39,
  //   BarcodeFormat.CODE_93,
  //   BarcodeFormat.CODE_128,
  //   BarcodeFormat.DATA_MATRIX,
  //   BarcodeFormat.EAN_8,
  //   BarcodeFormat.EAN_13,
  //   BarcodeFormat.ITF,
  //   BarcodeFormat.MAXICODE,
  //   BarcodeFormat.PDF_417,
  //   BarcodeFormat.QR_CODE,
  //   BarcodeFormat.RSS_14,
  //   BarcodeFormat.RSS_EXPANDED,
  //   BarcodeFormat.UPC_A,
  //   BarcodeFormat.UPC_E,
  //   BarcodeFormat.UPC_EAN_EXTENSION,
  // ];
  // hints.set(DecodeHintType.TRY_HARDER, 1000);
  // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  // reader.setHints(hints);
  // try {
  //   const result = reader.decode(binaryBitmap);
  //   console.log(result.getText());
  // } catch (e) {
  //   console.error(e);
  // }
};
</script>

<template>
  <button @click="startCamera(false)">start</button>
  <video autoplay="true" ref="videoRef"></video>
  <button @click="switchCamera">switch</button>
  <button @click="screenshot">Snap</button>
</template>
