application = ENV['app'] || "ejk-frontend"
branch = ENV['branch'] || "ejk_production"
server = ENV['server_app'] || "root@122.112.243.112"
set :application, application
set :stage, branch.to_sym
set :branch, branch.to_sym
role :app, server
set :deploy_to, "/react_apps/#{fetch(:application)}"

