using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
namespace MvcTest.wwwroot.cSharpFunction
{
    public class FileCounter
    {
        public static int GetNumberOfJsonFiles(string myBaseDirectory)
        {
            DirectoryInfo dirInfo = new DirectoryInfo(myBaseDirectory);
            
            int count = dirInfo.EnumerateDirectories()
                .AsParallel()
                .SelectMany(di => di.EnumerateFiles("*.*", SearchOption.AllDirectories))
                .Count();
            
            Console.WriteLine(count);
            return count;
        }
    }
}