sudo kubectl delete -f fetch_deployment_blue.yaml
sudo kubectl delete -f fetch_service_blue.yaml
sudo kubectl apply -f fetch_deployment_blue.yaml
sudo kubectl apply -f fetch_service_blue.yaml
