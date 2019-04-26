sudo kubectl delete -f login_deployment_blue.yaml
sudo kubectl delete -f login_service_blue.yaml
sudo kubectl apply -f login_deployment_blue.yaml
sudo kubectl apply -f login_service_blue.yaml
