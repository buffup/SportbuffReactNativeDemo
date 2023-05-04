//
//  Sport.swift
//  ReactNativeDemo2
//
//  Created by huda elhady on 28/04/2023.
//

import UIKit
import SportBuff

@objc(SportBuffWrapper)
class SportBuffWrapper: NSObject {
  private let buffView = BuffView()
  
  @objc
  func initializeSportBuff() {
    setupUI()
    // you should add your client name here
    SportBuff.initialize(clientAccount: "", anonymousLogin: false)
    showBuffView()
  }
  
  @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }
  
  private func showBuffView() {
    DispatchQueue.main.async {
      self.buffView.startStreamListener = { result in
        
        DispatchQueue.main.async {
          switch result {
          case .success(let status):
            print("status", status)
            switch status {
            case .connected:
              print("connected")
            default:
              ()
            }
          case .failure(let error):
            print(error.localizedDescription)
          }
        }
      }
      //you should provide either streamId or providerId
      self.buffView.startStream(streamId: "",
                                providerId: nil)
    }
  }
  
  private func setupUI() {
    DispatchQueue.main.async { [weak self] in
      
      guard let self = self,
            let rootViewController = UIApplication.shared.windows.first?.rootViewController?.topMostViewController() else {
        return
      }
      self.buffView.translatesAutoresizingMaskIntoConstraints = false
      rootViewController.view.addSubview(self.buffView)
      
      NSLayoutConstraint.activate([
        self.buffView.leadingAnchor.constraint(equalTo: rootViewController.view.leadingAnchor),
        self.buffView.trailingAnchor.constraint(equalTo: rootViewController.view.trailingAnchor),
        self.buffView.topAnchor.constraint(equalTo: rootViewController.view.safeAreaLayoutGuide.topAnchor),
        self.buffView.bottomAnchor.constraint(equalTo: rootViewController.view.bottomAnchor, constant: -90)
      ])
    }
  }
}
