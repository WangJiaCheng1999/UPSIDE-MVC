using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
namespace MvcTest.wwwroot.cSharpFunction
{
    public class FileCounter
    {
        public static int GetFilesCount(string path)
        {
            return Directory.GetFiles(path).Length;
        }
    }
}