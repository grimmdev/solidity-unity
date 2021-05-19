using SimpleJSON;
using UnityEngine;
using UnityEngine.UI;

public class PictureManager : MonoBehaviour
{
    [SerializeField]
    private Transform PictureParent;

    public void OnMessage(string s)
    {
        Debug.Log("Message Received");
        JSONNode json = JSON.Parse(s);
        string dna = json["dna"];
        for (int i = 0; i < dna.Length; i++)
        {
            Color color = GetColor(dna.Substring(i, 1));
            Image image = PictureParent.GetChild(i).GetComponent<Image>();
            image.color = color;
        }

        string receipt = json["address"];
        if(!Application.isEditor)
            Web3.OpenURL($"https://ropsten.etherscan.io/tx/{receipt}");
    }

    private Color GetColor(string s)
    {
        int i = int.Parse(s);
        if (i == 0)
        {
            return Color.white;
        } else if (i == 1)
        {
            return Color.blue;
        } else if (i == 2)
        {
            return Color.cyan;
        } else if (i == 3)
        {
            return Color.gray;
        } else if (i == 4)
        {
            return Color.green;
        } else if (i == 5)
        {
            return Color.magenta;
        } else if (i == 6)
        {
            return Color.red;
        } else if (i == 7)
        {
            return Color.yellow;
        } else if (i == 8)
        {
            return new Color32(255, 192, 203, 255);
        } else
        {
            return new Color32(255, 128, 0, 255);
        }
    }
}
