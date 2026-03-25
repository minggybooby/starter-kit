---                                                                                 
  name: review-uiux                     
  description: UI/UX 관점에서 코드를 리뷰합니다. 접근성, 반응형, 사용성, 디자인 일관성
   등을 검토합니다.                                                                   
  disable-model-invocation: true   # 사용자가 직접 /review-uiux 로만 실행
  user-invocable: true                                                                
  allowed-tools: Read, Grep, Glob, Agent
  argument-hint: [파일경로 또는 컴포넌트명]                                           
  ---                                                                                 
                                     
  # UI/UX 코드 리뷰                                                                   
                                        
  $ARGUMENTS에 대해 UI/UX 관점의 코드 리뷰를 수행하세요.                              
   
  ## 리뷰 체크리스트                                                                  
                                        
  ### 1. 접근성 (a11y)                                                                
  - 시맨틱 HTML 사용 여부 (div 남용 대신 button, nav, main 등)
  - aria-label, aria-describedby 등 ARIA 속성                                         
  - 키보드 네비게이션 지원 (tabIndex, onKeyDown)
  - 색상 대비 (텍스트/배경 간 충분한 명도차)                                          
  - alt 텍스트, role 속성                                                             
                                                                                      
  ### 2. 반응형 디자인                                                                
  - 모바일/태블릿/데스크톱 대응                                                       
  - 고정 px 대신 반응형 단위 사용       
  - 미디어 쿼리 또는 Tailwind 반응형 클래스 적절성                                    
  - 터치 타겟 크기 (최소 44x44px)                                                     
                                                                                      
  ### 3. 사용성                                                                       
  - 로딩 상태 표시 (스켈레톤, 스피너)                                                 
  - 에러 상태 처리 및 사용자 안내                                                     
  - 빈 상태(empty state) 처리                                                         
  - 폼 유효성 검증 피드백 (인라인 에러 메시지)                                        
  - 확인이 필요한 위험한 동작에 대한 confirm 처리                                     
                                                                                      
  ### 4. 디자인 일관성                                                                
  - 디자인 시스템(ShadcnUI) 컴포넌트 활용                                             
  - 색상, 간격, 타이포그래피의 일관성                                                 
  - 하드코딩된 스타일 값 대신 디자인 토큰 사용                                        
                                                                                      
  ### 5. 인터랙션                                                                     
  - hover, focus, active 상태 스타일                                                  
  - 애니메이션/트랜지션의 적절성        
  - 사용자 피드백 (토스트, 알림 등)                                                   
                                                                                      
  ## 출력 형식                                                                        
                                                                                      
  각 항목별로 다음 형식으로 결과를 정리하세요:                                        
                                     
  - ✅ **양호**: 잘 되어있는 부분                                                     
  - ⚠️  **개선 권장**: 개선하면 좋을 부분 (파일:라인 포함)
  - ❌ **수정 필요**: 반드시 고쳐야 할 부분 (파일:라인 포함)                          
                                                                                      
  사용법                                                                              
                                                                                      
  /review-uiux src/components/event/event-form.tsx
  /review-uiux src/components/calendar/                                               
   
  핵심 포인트                                                                         
                                        
  - disable-model-invocation: true — Claude가 자동으로 실행하지 않고, 사용자가        
  /review-uiux로 명시적으로 호출해야만 실행
  - $ARGUMENTS — 커맨드 뒤에 전달한 파일 경로나 컴포넌트명이 들어감                   
  - allowed-tools — 파일 읽기/검색 도구를 허용해서 코드를 직접 확인 가능              
  - 체크리스트 항목은 프로젝트 특성에 맞게 자유롭게 수정하면 됩니다