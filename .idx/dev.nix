{ pkgs, ... }: {
  # Let Nix manage packages for your workspace.
  packages = [
    pkgs.nodejs_20
  ];

  # You can also install packages from npm.
  npm.install.enable = true;

  # E.g., install Python and related tools.
  #
  # languages.python = {
  #   enable = true;
  #   version = "3.11";
  # };
  #
  # Sets environment variables in the workspace
  env = {
    GEMINI_API_KEY = "AIzaSyASFSzeHzgSi6mgDXOrRpv0EgCtuMvfNQo";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          # and tell the command to start the web server on host 0.0.0.0.
          command = [ "npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0" ];
          manager = "web";
        };
      };
    };

    # The following hooks are run during workspace startup.
    # The `onLoad` hook is run whenever a workspace is resumed or created.
    # The `onCreate` hook is run only when the workspace is created.
    #
    # onLoad = {
    #   # Example: run `npm install` automatically in the background
    #   npm-install = "npm install";
    # };
  };
}
