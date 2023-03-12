public class App {
    public static void main(String[] args){
        try{
            for (int i= 1; i<=401;i++){
                String fileName = "";
                if (i < 100){
                    if(i < 10){
                        fileName =  "00" + i;
                    }
                    else {
                        fileName = "0" + i;
                    }
                }
                else{
                    fileName = Integer.toString(i);
                }
                S3Uploader s3 = new S3Uploader("firstb00883865",
                        "Assignment3",
                        fileName+".txt",
                        "./tech/"+fileName+".txt");
                s3.uploadFile();
                Thread.sleep(2000);
            }
        }catch (InterruptedException e){
            System.out.println(e.getMessage());
        }
    }
}
