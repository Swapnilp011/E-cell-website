{ pkgs, ... }: {
  # Let Project IDX know you're running a web app.
  idx.previews = {
    enable = true;
    previews = {
      web = {
        # We're using `npm run dev` to start the web server.
        # Your port is set automatically by Project IDX.
        command = [ "npm" "run" "dev" "--" "--port" "$PORT" ];
        manager = "web";
      };
    };
  };
}
