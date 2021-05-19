using System;
using UnityEngine;
using System.Runtime.InteropServices;
using SimpleJSON;
using Random = UnityEngine.Random;

public class Web3
{
    [DllImport("__Internal")]
    private static extern void InternalCreatePicture(string str);

    [DllImport("__Internal")]
    private static extern string InternalWalletAddress();

    [DllImport("__Internal")]
    private static extern string InternalOpenURL(string url);

    public static string GetWalletAddress()
    {
        if (Application.isEditor)
            return "0x0000000000000000000000000000000000000000";
        else
            return InternalWalletAddress();
    }

    public static void OpenURL(string url)
    {
        if (Application.isEditor)
            Application.OpenURL(url);
        else
            InternalOpenURL(url);
    }

    public static void CreatePicture(string s)
    {
        if (Application.isEditor)
        {
            Debug.Log("Picture Generated");
            JSONNode json = JSON.Parse("{}");
            string dna = GenerateString();
            json["dna"] = dna;

            Web3Manager.i.Message(json.ToString());
        }
        else
            InternalCreatePicture(s);
    }

    private static string GenerateString()
    {
        string result = string.Empty;
        for (int i = 0; i < 64; i++)
        {
            result += Random.Range(1, 9);
        }

        return result;
    }
}