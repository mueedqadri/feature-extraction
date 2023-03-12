import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.File;

public class S3Uploader {

private static String bucketName ;
private static String folderName ;
private static String fileNameInS3;
private static String fileNameInLocalPC;
private final Regions clientRegion = Regions.US_EAST_1;
private final AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
        .withRegion(clientRegion)
        .build();

public S3Uploader(String bucketName, String folderName, String fileNameInS3, String fileNameInLocalPC){
    S3Uploader.bucketName = bucketName;
    S3Uploader.folderName = folderName;
    S3Uploader.fileNameInS3 = fileNameInS3;
    S3Uploader.fileNameInLocalPC = fileNameInLocalPC;
}

public void  uploadFile(){
    try {
        PutObjectRequest request = new PutObjectRequest(bucketName, folderName + "/" + fileNameInS3, new File(fileNameInLocalPC));
        s3Client.putObject(request);
        System.out.println("--Uploading "+fileNameInLocalPC+" done");
    }catch (Exception e) {
        e.printStackTrace();
    }
}}
