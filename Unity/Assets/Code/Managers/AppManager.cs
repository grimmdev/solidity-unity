using System;
using UnityEngine;
using UnityEngine.UI;
using Random = System.Random;

public class AppManager : MonoBehaviour
{
    [SerializeField]
    private InputField AddressField;

    [SerializeField]
    private Button PurchaseButton;

    public void OnReady()
    {
        Debug.Log("Ready");
        AddressField.text = Web3.GetWalletAddress();
        PurchaseButton.interactable = true;
    }

    public void OnClick()
    {
        Random r = new Random();
        string s = string.Empty;
        s += RandomLong(r);
        s += RandomLong(r);
        s += RandomLong(r);
        s += RandomLong(r);
        s = s.Substring(0, 64);
        Web3.CreatePicture(s);
    }

    private string RandomLong(Random rnd)
    {
        byte[] buffer = new byte[8];
        rnd.NextBytes(buffer);
        return Math.Abs(BitConverter.ToInt64(buffer, 0)).ToString();
    }
}
