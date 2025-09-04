# How to Upload Your Project to GitHub

This guide will walk you through the process of uploading your existing Firebase Studio project to a new repository on GitHub.

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in to your account.
2.  Click the **+** icon in the top-right corner and select **"New repository"**.
3.  Give your repository a name (e.g., `ecell-website`).
4.  Choose whether you want the repository to be public or private.
5.  **Important:** Do **not** initialize the new repository with a README, .gitignore, or license file. Your project already contains these files, and selecting these options can cause conflicts.
6.  Click **"Create repository"**.

After creating the repository, you'll be taken to its main page. Keep this page open, as you will need to copy the repository URL.

### Step 2: Prepare Your Local Project

Now, you'll use your terminal or command prompt to connect your local project to the new GitHub repository.

1.  **Open your terminal** and navigate to your project's root directory.

2.  **Initialize a new Git repository:**
    ```bash
    git init -b main
    ```
    This command creates a new Git repository in your project folder and sets the default branch name to `main`.

3.  **Add all your project files to the staging area:**
    ```bash
    git add .
    ```
    This command stages all the files in your current directory for the first commit.

4.  **Commit the files:**
    ```bash
    git commit -m "Initial commit"
    ```
    This command saves your staged files as the first commit in your repository's history.

### Step 3: Connect and Push to GitHub

1.  **Add the remote repository URL:**
    Go back to your GitHub repository page. You will see a URL under the "Quick setup" section. Copy the HTTPS URL. It will look something like this: `https://github.com/YourUsername/YourRepositoryName.git`.

    In your terminal, run the following command, replacing the URL with your own:
    ```bash
    git remote add origin https://github.com/YourUsername/YourRepositoryName.git
    ```
    This command links your local repository to the one you created on GitHub.

2.  **Push your code to GitHub:**
    ```bash
    git push -u origin main
    ```
    This command uploads your committed files to the `main` branch on GitHub. The `-u` flag sets the `main` branch as the default for future pushes.

That's it! If you refresh your GitHub repository page, you will see all of your project files. You can now manage your code directly from your terminal and GitHub.
