---
title: Supplementary Developer Contribution Guidelines
sidebar_position: 8
---

# Supplementary Developer Contribution Guidelines:


## DCO

  
DCO (Developer Certificate of Origin) needed for each commit, contributors must sign off on their commits to certify that they have the right
to submit the code they are contributing. This is done using `--signoff` option in Git.  

The sign-off is a simple line at the end of the commit message, which looks like this:  
  
```
    Signed-off-by: Your Name <your.email@example.com>
```
  
You can add this automatically to your commit message using the `-s` or `--signoff` 
   
flag when you make a commit,here are the steps to follow so the computer can add it for you:

**Set your legal name in the git configuration:**
  
```
    git config user.name "Legal Name" 
```
  
**Set your email in the git configuration:**
  
```
    git config user.email "your.email@example.com" 
```
  
**Add the -s  or --signoff  to all git commit  invocations.**
  
```
    git commit -s -m "Your commit message"
```
  
**Add above signoff line for last unsigned commit**

```
    git commit -s --amend
```


## Ensuring to squash similiar commits

  
To ensure that your pull request does not contain multiple similiar commits, you may need to squash your commits.
  
Here's how to do it:

**Rebase Your Branch:**
  
Rebase your feature branch onto the latest version of the target branch
  
```
    git checkout feature-branch
    git fetch origin
    git rebase origin/master
```
    
**Squash Commits:**
  
Interactive rebase to squash commits:
  
```
    git rebase -i HEAD~N
```
    
Replace 'N' with the number of similiar commits you want to squash. In the interactive rebase interface, 

Replace 'pick' with 'squash' for all commits except the first one. And amend the commit message if needed.
  	
**Force Push:**
    
After squashing your commits, force push your branch to update your pull request:
    
```
    git push -f 
```


