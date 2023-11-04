document.addEventListener("DOMContentLoaded", function() {
    const uploadedImg = document.getElementById("imageInput");
    const showUpload = document.getElementById("uploadedImage");
    const resultImage = document.getElementById("resultImage");
    const previewBtn = document.getElementById("preview");
    const removeBg = document.getElementById("btnRmbg");
    const downloadButton = document.getElementById('downLoad');
  
    uploadedImg.onchange = function() {
      showUpload.src = URL.createObjectURL(uploadedImg.files[0]);
    };
  
    previewBtn.addEventListener('click', function() {
      window.open(showUpload.src);
    });
  
    removeBg.addEventListener('click', function(event) {
      event.preventDefault();
  
      var apiEndpoint = 'https://api.remove.bg/v1.0/removebg';
      var apiKey = 'ZT2AwhWV4Go6Q5NJULVqVXFS';
  
      var formData = new FormData();
      formData.append('image_file', uploadedImg.files[0]);
      formData.append('size', 'auto');
  
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey
        },
        body: formData
      })
      .then(function(response) {
        if (response.ok) {
          console.log(response);
          return response.blob();
        } else {
          throw new Error('API request failed.');
        }
      })
      .then(function(imageBlob) {
        var imageUrl = URL.createObjectURL(imageBlob);
        resultImage.src = imageUrl;
        var downloadLink = document.createElement('a');
        downloadLink.href = imageUrl;
        downloadLink.setAttribute('download', 'background_removed_image.png');
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
  
        downloadButton.onclick= ()=>{
        downloadLink.click();
        }
        document.body.removeChild(downloadLink);
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
    });
  });