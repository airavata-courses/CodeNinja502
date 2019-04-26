sudo kubectl delete -f /home/ubuntu/CodeNinja502/upload_service_blue.yaml
sudo kubectl delete -f /home/ubuntu/CodeNinja502/upload_deployment_blue.yaml
sudo kubectl apply -f /home/ubuntu/CodeNinja502/upload_service_blue.yaml
sudo kubectl apply -f /home/ubuntu/CodeNinja502/upload_deployment_blue.yaml
