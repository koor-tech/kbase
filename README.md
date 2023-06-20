# kbase

Koor Knowledge base

## Contributing

### Previewing Documentation

1. You need to have `python3` and `pip` installed on your computer.
2. Install the dependencies by running this command in the root of the repository: `pip install -r requirements.txt`
3. Now you should be able to run `npm run docs:dev`
      1. Should the command return `mkdocs command not found`, you need to adjust your `PATH` variable on your system to include Python's library bin path.
            1. Linux: `export PATH="$HOME/.local/bin:$PATH"` 
            2. Mac: `export PATH="$HOME/.local/bin:$PATH"`
            3. Windows: `~/AppData/Roaming/Python/Scripts/` [add to your session (instructions)](https://www.java.com/en/download/help/path.html).
4. After a few seconds, the console output should tell you where to find the documentation preview, by default it should be available at [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/).
