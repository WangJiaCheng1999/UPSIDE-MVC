using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;

namespace MvcTest.wwwroot.cSharpFunction
{
    public class FileCounter
    {
        //Count how many files files in given location
        public static int GetFilesCount(string path)
        {
            return Directory.GetFiles(path).Length;
        }
        
        //Get all the file name in JData for later Data retrieval in ajax
        public static string GetFiles(string path)
        {
            string[] a = Directory.GetFiles(path);
            string fileList = "";
            
            for (int i = 0; i < a.Length; i++)
            {
                string fileName = a[i].Substring(path.Length + 1);
                Console.WriteLine(Path.GetFileNameWithoutExtension(fileName)); 
                fileList += fileName + ",";
            }
            
            fileList = fileList.Substring(0, fileList.Length - 1);
            
            return fileList;
        }
    }
    

}