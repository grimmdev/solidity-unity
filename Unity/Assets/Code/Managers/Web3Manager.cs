using UnityEngine;
using UnityEngine.Events;

public class Web3Manager : MonoBehaviour
{
    public static Web3Manager i;

    public UnityEvent OnReady = new UnityEvent();
    public StringEvent OnMessage = new StringEvent();

    private void Awake()
    {
        i = this;
    }

    private void Start()
    {
        if(Application.isEditor)
            Initialize();
    }

    public void Initialize()
    {
        if(OnReady != null)
            OnReady.Invoke();
    }

    public void Message(string s)
    {
        if(OnMessage != null)
            OnMessage.Invoke(s);
    }
}
