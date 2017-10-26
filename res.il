    .assembly Main {}
    .assembly extern mscorlib {}
    .method static void Main()
    {
      .entrypoint
      .maxstack 2
      .locals(int32 a,
      int32 b,
      int32 c)
      ldc.i4 0x1
      stloc 0
      ldc.i4 0x2
      stloc 1
      ldloc 0
      ldloc 1
      mul
      stloc 2
      
      ldstr "a = "
      ldloc 0
      box [mscorlib]System.Int32
      call string string::Concat(object, object)
      call void class [mscorlib]System.Console::WriteLine(string)
      ldstr "b = "
      ldloc 1
      box [mscorlib]System.Int32
      call string string::Concat(object, object)
      call void class [mscorlib]System.Console::WriteLine(string)
      ldstr "c = "
      ldloc 2
      box [mscorlib]System.Int32
      call string string::Concat(object, object)
      call void class [mscorlib]System.Console::WriteLine(string)
      ret
    }