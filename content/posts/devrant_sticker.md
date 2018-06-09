---
title: "devRant Sticker"
author: "RC"
date: 2018-05-29T11:58:42+05:30
draft: true
---

So, [devRant](https://devrant.com/) is giving free stickers to everyone who get more than `20++` on an single rant. 
I wanted the stickers but it would take some time before I can get _20++_ on single rant. So I devised a method to create proxy users and `++` my rant.

<!--more-->

In my domain, I setup a _catch-all_ domain which forwards all mails sent on non-exsistent `MX records`. E.g. if an email is sent to a non-exsisting email ID like `email@mydomain.com`, it is forwarded to my default _email-ID_. Therefore, opening possibility of infinite username and email-IDs.

Now, I automated the process of _signup_ and _login_ on __devRant__ using python     `selenium webdriver`. Then the user was verified by getting latest mail from default email-ID's `imap account`. Email was parsed using _python's_ `email.parser`. The _content_ of email was in `HTML`, so I used `Beautiful Soup` for parsing and extracting the _\`verify user\`_ link. Finally the rant was _upvoted_, using _selenium_.

__Steps involved:__
1. Generate _email-ID_ and _username_, like `yo@mydomain.com` and `yoyo`.
2. Go to _devRant_, fill _signup_ details, click _Submit_.
3. Check if total _email count_ in `imap` account increased by 1
    1. `No:` Go to __3__
    2. `Yes:` Go to __4__
4. Get confirmation link from _email_, verify the user.
5. Go to the _rant_.
6. __Upvote__.
7. Repeat untill required amount is reached.

### Notes
* Initially I tried `POP3` to read emails but it was doing weird shit, so switched to `IMAP`.
* The stickers request is still pending, I have mailed to them. Waiting for the response.
* __Defualt password__ for each account, __imap host__, __imap account__ and __password__ are all set as `environment variable`. If they are not set, `exception` will be raised.
    * `export PASSWORD=password`, for _default password_
    * `export IMAP_HOST=host`, for _IMAP_HOST_
    * `export IMAP_USER=user`, for _IMAP USER_
    * `export IMAP_PSSWD=imap_password`, for _IMAP PASSWORD_ 
* I know, the code, as well the design is horrible, but it works. Using _classes_ is a much better design choice than normal _functions_ but I didn't have that much time and this thing worked.
* Whole _source code_ is in the file `rantupvote.py`.

### References
* [Selenium](http://selenium-python.readthedocs.io/)
* [IMAP](https://pymotw.com/2/imaplib/), [2](https://docs.python.org/3.6/library/imaplib.html)
* [Email parser python](https://docs.python.org/3/library/email.parser.html)
* [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
