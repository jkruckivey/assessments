#!/usr/bin/env python3
"""
Simple test script for the AI Assessment Bot
Run this to verify basic functionality before deployment
"""

import os
import sys
from pathlib import Path

def test_file_structure():
    """Test that all required files exist"""
    print("[INFO] Testing file structure...")

    required_files = [
        'app.py',
        'requirements.txt',
        'render.yaml',
        'runtime.txt',
        'templates/chat.html',
        '.env.example'
    ]

    missing_files = []
    for file_path in required_files:
        if not Path(file_path).exists():
            missing_files.append(file_path)

    if missing_files:
        print(f"[FAIL] Missing files: {missing_files}")
        return False
    else:
        print("[PASS] All required files present")
        return True

def test_knowledge_base():
    """Test that knowledge base files can be loaded"""
    print("\n[INFO] Testing knowledge base loading...")

    kb_path = Path('./Instructional Design Principles')
    if not kb_path.exists():
        print("[FAIL] Knowledge base directory not found")
        return False

    md_files = list(kb_path.rglob('*.md'))
    if len(md_files) == 0:
        print("[FAIL] No markdown files found in knowledge base")
        return False

    print(f"[PASS] Found {len(md_files)} knowledge base files:")
    for md_file in md_files[:5]:  # Show first 5
        rel_path = md_file.relative_to(kb_path)
        print(f"   - {rel_path}")

    if len(md_files) > 5:
        print(f"   ... and {len(md_files) - 5} more")

    return True

def test_imports():
    """Test that all required modules can be imported"""
    print("\n[INFO] Testing imports...")

    required_modules = [
        'flask',
        'anthropic',
        'markdown',
        'pathlib',
        'json',
        'logging'
    ]

    missing_modules = []
    for module in required_modules:
        try:
            __import__(module)
        except ImportError:
            missing_modules.append(module)

    if missing_modules:
        print(f"[FAIL] Missing modules: {missing_modules}")
        print("   Run: pip install -r requirements.txt")
        return False
    else:
        print("[PASS] All required modules available")
        return True

def test_environment():
    """Test environment configuration"""
    print("\n[INFO] Testing environment...")

    # Check if .env file exists
    if Path('.env').exists():
        print("[PASS] .env file found")

        # Try to load and check for API key
        try:
            with open('.env', 'r') as f:
                env_content = f.read()
                if 'CLAUDE_API_KEY' in env_content:
                    if 'your_claude_api_key_here' in env_content:
                        print("[WARN] Please update CLAUDE_API_KEY in .env file")
                    else:
                        print("[PASS] CLAUDE_API_KEY configured")
                else:
                    print("[FAIL] CLAUDE_API_KEY not found in .env")
        except Exception as e:
            print(f"[FAIL] Error reading .env: {e}")
    else:
        print("[WARN] .env file not found - copy from .env.example")

    return True

def test_app_startup():
    """Test basic app functionality"""
    print("\n[INFO] Testing app startup...")

    try:
        # Add current directory to path
        sys.path.insert(0, '.')

        # Import the app
        from app import app, AssessmentBot

        print("[PASS] App imports successfully")

        # Test app configuration
        if app.secret_key:
            print("[PASS] Secret key configured")
        else:
            print("[WARN] Secret key not set")

        return True

    except Exception as e:
        print(f"[FAIL] App startup failed: {e}")
        return False

def main():
    """Run all tests"""
    print("AI Assessment Bot - Test Suite")
    print("=" * 40)

    tests = [
        test_file_structure,
        test_imports,
        test_knowledge_base,
        test_environment,
        test_app_startup
    ]

    passed = 0
    for test in tests:
        if test():
            passed += 1

    print("\n" + "=" * 40)
    print(f"Test Results: {passed}/{len(tests)} tests passed")

    if passed == len(tests):
        print("[SUCCESS] All tests passed! Ready for deployment.")
        print("\nNext steps:")
        print("1. Add your Claude API key to .env file")
        print("2. Test locally: python app.py")
        print("3. Deploy to Render using the deployment guide")
    else:
        print("[ERROR] Some tests failed. Please fix issues before deployment.")

    return passed == len(tests)

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)