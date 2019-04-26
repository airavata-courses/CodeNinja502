sudo kubectl delete -f  /home/ubuntu/CodeNinja502/login_deployment_green.yaml
sudo kubectl delete -f  /home/ubuntu/CodeNinja502/login_service_green.yaml
sudo kubectl apply -f  /home/ubuntu/CodeNinja502/login_deployment_green.yaml
sudo kubectl apply -f  /home/ubuntu/CodeNinja502/login_service_green.yaml
