using System;

namespace async_await
{
    public class Program
    {
        static void DoSomething(int seconds, string mgs, ConsoleColor color)
        {

            lock (Console.Out)
            {
                Console.ForegroundColor = color;
                Console.WriteLine(DateTime.Now.TimeOfDay.ToString()+ $" :{mgs,10} ... Start");
                Console.ResetColor();
            }


            for (int i = 1; i <= seconds; i++)
            {
                lock (Console.Out)
                {
                    Console.ForegroundColor = color;
                    Console.WriteLine(DateTime.Now.TimeOfDay.ToString()+$" :{mgs,10} {i,2}");
                    Console.ResetColor();
                }
                Thread.Sleep(1000);

            }
            lock (Console.Out)
            {
                Console.ForegroundColor = color;
                Console.WriteLine(DateTime.Now.TimeOfDay.ToString()+$" :{mgs,10} ... End");
                Console.ResetColor();
            }

        }
        static void Main(string[] args)
        {
            /*
            // synchronous
            DoSomething(6, "T1", ConsoleColor.Magenta);
            DoSomething(10, "T2", ConsoleColor.Green);
            DoSomething(4, "T3", ConsoleColor.Yellow);
            Console.WriteLine("Hello world");
            */

            //Task
            Task t2 = new Task(() =>
            {
                DoSomething(10, "T2", ConsoleColor.Green);
            });
            
            Task t3 = new Task((object ob) =>
            {
                string tentacvu = (string)ob;
                DoSomething(4, "T3", ConsoleColor.Yellow);

            }, "T3");

            t2.Start();
            t3.Start();
            DoSomething(6, "T1", ConsoleColor.Magenta);

            //t2.Wait();
            //t3.Wait();
            Task.WaitAll(t2,t3);

            Console.WriteLine("Press any key to finish!!!");
            Console.ReadKey();
        }
    }
}